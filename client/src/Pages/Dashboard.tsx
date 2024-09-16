import React from 'react';
import { useAppContext } from '../context/Context';

const Dashboard: React.FC = () => {
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative h-screen bg-gray-100 p-8">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user?.username}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
