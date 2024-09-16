import React from 'react';
import { ContextProvider, useAppContext } from './context/Context';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
};

const RootApp: React.FC = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

export default RootApp;
