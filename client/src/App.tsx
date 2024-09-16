import React from 'react';
import { ContextProvider, useAppContext } from './context/Context';
import ApolloProvider from './provider/ApolloProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
};

const RootApp: React.FC = () => (
  <ApolloProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ApolloProvider>
);

export default RootApp;
