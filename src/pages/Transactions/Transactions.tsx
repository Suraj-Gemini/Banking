import React, { useEffect, useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { JSX } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination,
  Paper,
} from "@mui/material";

export type TxType = "credit" | "debit";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TxType;
  amount: number;
  balance: number;
}

interface Filters {
  search: string;
  type: "all" | TxType;
  dateFrom: string;
  dateTo: string;
  balanceMin?: number | "";
  balanceMax?: number | "";
}

function generateMockTransactions(count: number, seed = 42): Transaction[] {
  let s = seed >>> 0;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  const txs: Transaction[] = [];
  let balance = 10000;

  for (let i = 0; i < count; i++) {
    const d = new Date(startDate.getTime());
    d.setDate(d.getDate() + Math.floor(rand() * 90));

    const isCredit = rand() > 0.5;
    const amount = Math.round((rand() * 5000 + 50) * 100) / 100;

    balance = isCredit ? balance + amount : balance - amount;

    const tx: Transaction = {
      id: `TX-${String(i + 1).padStart(6, "0")}`,
      date: d.toISOString().slice(0, 10),
      description: isCredit ? "Salary/Inbound" : "Purchase/Outbound",
      type: isCredit ? "credit" : "debit",
      amount,
      balance: Math.round(balance * 100) / 100,
    };
    txs.push(tx);
  }

  txs.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1
  );
  return txs;
}

async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise(r => setTimeout(r));
  return generateMockTransactions(137);
}

function toCsv(rows: Transaction[]): string {
  const headers = [
    "transaction_id",
    "date",
    "description",
    "type",
    "amount",
    "balance",
  ];
  const escape = (val: unknown) => {
    const s = String(val ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const out = [headers.join(",")];
  for (const r of rows) {
    out.push(
      [
        escape(r.id),
        escape(r.date),
        escape(r.description),
        escape(r.type),
        r.amount.toFixed(2),
        r.balance.toFixed(2),
      ].join(",")
    );
  }
  return out.join("\n");
}

function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parseNumberOrEmpty(value: string): number | "" {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50] as const;

const App: React.FC = (): JSX.Element => {
  const [allRows, setAllRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    dateFrom: "",
    dateTo: "",
    balanceMin: "",
    balanceMax: "",
  });

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTransactions();
        setAllRows(data);
      } catch (e) {
        setError(`Failed to load transactions: ${String(e)}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo<Transaction[]>(() => {
    const { search, type, dateFrom, dateTo, balanceMin, balanceMax } = filters;

    return allRows.filter(r => {
      if (search && !r.id.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (type !== "all" && r.type !== type) return false;

      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;

      if (balanceMin !== "" && r.balance < (balanceMin as number)) return false;
      if (balanceMax !== "" && r.balance > (balanceMax as number)) return false;

      return true;
    });
  }, [allRows, filters]);

  const { totalCredit, totalDebit } = useMemo(() => {
    let credit = 0;
    let debit = 0;
    for (const r of filtered) {
      if (r.type === "credit") credit += r.amount;
      else debit += r.amount;
    }
    return { totalCredit: credit, totalDebit: debit };
  }, [filtered]);

  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [filters, rowsPerPage]);

  const handleTypeChange = (e: SelectChangeEvent) => {
    const value = e.target.value as Filters["type"];
    setFilters(f => ({ ...f, type: value }));
  };

  const handleDownloadCsv = (): void => {
    const csv = toCsv(filtered);
    download(`transactions_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Transaction History Viewer
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            useFlexGap
            flexWrap="wrap"
          >
            <TextField
              label="Search by Transaction ID"
              placeholder="e.g. TX-000123"
              value={filters.search}
              onChange={e =>
                setFilters(f => ({ ...f, search: e.target.value }))
              }
              size="small"
              slotProps={{
                input: {
                  inputMode: "text",
                },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                label="Type"
                value={filters.type}
                onChange={handleTypeChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="From"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateFrom}
              onChange={e =>
                setFilters(f => ({ ...f, dateFrom: e.target.value }))
              }
              slotProps={{
                input: {
                  inputMode: "none",
                },
              }}
            />

            <TextField
              label="To"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateTo}
              onChange={e =>
                setFilters(f => ({ ...f, dateTo: e.target.value }))
              }
              slotProps={{
                input: {
                  inputMode: "none",
                },
              }}
            />

            <TextField
              label="Min Balance"
              size="small"
              value={filters.balanceMin ?? ""}
              onChange={e =>
                setFilters(f => ({
                  ...f,
                  balanceMin: parseNumberOrEmpty(e.target.value),
                }))
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  inputMode: "decimal",
                },
              }}
            />
            <TextField
              label="Max Balance"
              size="small"
              value={filters.balanceMax ?? ""}
              onChange={e =>
                setFilters(f => ({
                  ...f,
                  balanceMax: parseNumberOrEmpty(e.target.value),
                }))
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  inputMode: "decimal",
                },
              }}
            />

            <Box flex={1} />

            <Button
              variant="outlined"
              onClick={handleDownloadCsv}
              sx={{ ml: "auto" }}
            >
              Download CSV (Filtered)
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems={{ md: "center" }}
          >
            <Typography variant="body1">
              <strong>Results:</strong> {filtered.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Typography variant="body1">
              <strong>Total Credit (₹):</strong> {totalCredit.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              <strong>Total Debit (₹):</strong> {totalDebit.toFixed(2)}
            </Typography>
          </Stack>

          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="transactions-table">
                <TableHead>
                  <TableRow>
                    <TableCell width={160}>Transaction ID</TableCell>
                    <TableCell width={130}>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell width={100}>Type</TableCell>
                    <TableCell align="right" width={120}>
                      Amount (₹)
                    </TableCell>
                    <TableCell align="right" width={140}>
                      Balance (₹)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6}>Loading…</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6} color="error.main">
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : pagedRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        No transactions match your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedRows.map(row => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {row.type}
                        </TableCell>
                        <TableCell align="right">
                          {row.amount.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {row.balance.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filtered.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={e =>
                setRowsPerPage(parseInt(e.target.value, 10))
              }
              rowsPerPageOptions={[...ROWS_PER_PAGE_OPTIONS]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;
