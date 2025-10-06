
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../features/theme/themeSlice'

import { Button } from '@mui/material';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(s => s.theme.mode);

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {mode === 'light' ? 'Light' : 'Dark'}
    </Button>
  );
}