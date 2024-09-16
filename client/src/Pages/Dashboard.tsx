import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import Table from '../components/Table';

enum Views {
    Categories = 'categories',
    Risks = 'risks'
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAppContext();
  const [view, setView] = useState(Views.Categories);

  const buttonClass = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const activeButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"

  const handleLogout = () => {
    logout();
  };

  const categories = [
    { name: 'Category 1', description: 'Description 1', createdBy: 'User1' },
    { name: 'Category 2', description: 'Description 2', createdBy: 'User2' },
  ];

  const risks = [
    { name: 'Risk 1', description: 'Risk Description 1', resolved: 'Yes', createdBy: 'User1' },
    { name: 'Risk 2', description: 'Risk Description 2', resolved: 'No', createdBy: 'User2' },
  ];

  return (
    <div className="relative w-full h-screen bg-gray-100 p-8 flex items-start justify-center">
      <div className="w-4/5 bg-white shadow-lg rounded p-6 relative flex flex-col justify-between">
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold text-gray-800">
            Welcome, {user?.username}!
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setView(Views.Categories)}
            className={view === Views.Categories ? activeButtonClass : buttonClass}
          >
            Categories
          </button>
          <button
            onClick={() => setView(Views.Risks)}
            className={view === Views.Risks ? activeButtonClass : buttonClass}
          >
            Risks
          </button>
        </div>

        <div className="mt-4">
          {view === Views.Categories && (
            <Table
              headings={['name', 'description', 'createdBy']}
              data={categories}
            />
          )}
          {view === Views.Risks && (
            <Table
              headings={['name', 'description', 'resolved', 'createdBy']}
              data={risks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
