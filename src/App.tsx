import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRoutes from './routes/app-routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SpeedInsights />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
