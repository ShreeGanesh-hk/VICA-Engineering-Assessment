import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/customtheme';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './views';
import "./index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />      
        <BrowserRouter>
          <Container maxWidth={false}>
            <MainPage />           
          </Container>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
