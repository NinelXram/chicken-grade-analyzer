import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import GradeAnalyzer from './components/GradeAnalyzer'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GradeAnalyzer />
    </ThemeProvider>
  )
}

export default App
