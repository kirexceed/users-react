import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import Ll from './pages/MainPage/Ll';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MainPage />
        {/* <Ll /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
