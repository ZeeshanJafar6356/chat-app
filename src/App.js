// frontend/src/App.js
import React from 'react';
import Chat from './Chat';
import { CssBaseline, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom align="center" style={{ marginTop: '20px' }}>
          React Chat App
        </Typography>
        <Chat />
      </Container>
    </ThemeProvider>
  );
}

export default App;
