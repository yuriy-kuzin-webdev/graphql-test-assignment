import React from 'react';
import { ContextProvider, useAppContext } from './context/Context';
import Login from './Pages/Login';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      {user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
        </div>
      ) : (
        <Login/>
      )}
    </div>
  );
};

const RootApp: React.FC = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

export default RootApp;
