import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/customtheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './views';
import { Provider } from 'react-redux';
import { store } from './data-manage/store';
import "./index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Container maxWidth={false}>
            <Routes>
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
