import { Container, Box, Typography, LinearProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { schema, type LoanFormData } from './loanSchema';
import StepPersonal from './steps/StepPersonal';
import StepLoanDetails from './steps/StepLoanDetails';
import StepDocuments from './steps/StepDocuments';
import StepReview from './steps/StepReview';

import './LoanForm.css';

const LS_KEY = 'loan-progress-v1';

export default function LoanForm() {
  const [saved, setSaved] = useState<LoanFormData & { __step?: number } | null>(null);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (data) {
        setSaved(data);
        setStep(data.__step || 1);
      }
    } catch {
      setSaved(null);
    }
  }, [setStep]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<LoanFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues:
      saved || {
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        loanType: 'Personal',
        amount: 1000,
        tenure: 1,
        income: 800000,
      },
  });

  useEffect(() => {
    if (saved) {
      reset(saved);
    }
  }, [saved, reset]);
  const navigate = useNavigate();

  const all = watch();
  useEffect(() => {
    const v = { ...getValues(), __step: step };
    localStorage.setItem(LS_KEY, JSON.stringify(v));
  }, [all, step, getValues]);

  const progress = (step - 1) * 33 + 1;

  const onNext = async () => {
    if (step === 1) {
      const ok = await trigger(['fullName', 'email', 'phone', 'dob', 'address']);
      if (!ok) return;
    }
    if (step === 2) {
      const ok = await trigger(['loanType', 'amount', 'tenure', 'income']);
      if (!ok) return;
    }
    setStep((s: number) => Math.min(4, s + 1));
  };

  const onPrev = () => setStep((s: number) => Math.max(1, s - 1));

  const onSubmit = () => {
    alert('Form Submitted Successfully');
    localStorage.removeItem(LS_KEY);
    navigate('/');   // Go back to Dashboard
  };

  return (
    //<Container maxWidth="md" className="md">
     // <div className="page-wrapper">
         <div className="card">
        <Box className="card" sx={{ marginTop: '5rem' }}>
          <Typography variant="h4" className="form-title">
            Loan Application Form
          </Typography>

          <LinearProgress variant="determinate" value={progress} className="progress" />
          <Typography variant="subtitle1" className="step-title">
            Step {step} of 4
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <StepPersonal register={register} errors={errors} />}
            {step === 2 && <StepLoanDetails register={register} errors={errors} getValues={getValues} />}
            {step === 3 && <StepDocuments register={register} />}
            {step === 4 && <StepReview getValues={getValues} setStep={setStep} />}

            <Box className="row">
              {step > 1 && (
                <Button variant="outlined" onClick={onPrev}>
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button variant="contained" type="button" onClick={async (e) => {
                  e.preventDefault();
                  await onNext();
                }}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
 </div>
  //    </div>
    //</Container>
  );
}
