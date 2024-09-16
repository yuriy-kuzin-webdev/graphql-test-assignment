import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_RISKS } from '../graphql/queries';
import { useAppContext } from '../context/Context';
import Table from '../components/Table';

enum Views {
    Categories = 'categories',
    Risks = 'risks'
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAppContext();
  const [view, setView] = useState(Views.Categories);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const limit = 10;

  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(GET_CATEGORIES, {
    variables: { page, limit },
    skip: view !== Views.Categories,
  });

  const { data: risksData, loading: risksLoading, error: risksError } = useQuery(GET_RISKS, {
    variables: { page, limit },
    skip: view !== Views.Risks,
  });

  const buttonClass = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const activeButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"

  const handleLogout = () => {
    logout();
  };

  const handleNextPage = () => {
    const totalPages = view === Views.Categories ? categoriesData?.categories?.totalPages : risksData?.risks?.totalPages;
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handlePageInput = () => {
    const totalPages = view === Views.Categories ? categoriesData?.categories?.totalPages : risksData?.risks?.totalPages;
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setInputPage('');
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [view])

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
            <>
              {categoriesLoading && <p>Loading Categories...</p>}
              {categoriesError && <p>Error loading categories</p>}
              {categoriesData && (
                <Table
                  headings={['name', 'description', 'createdBy']}
                  data={categoriesData.categories.categories}
                />
              )}
              <div className="flex justify-between mt-4">
                <button
                  className={buttonClass}
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <div className="text-gray-700">
                  Page {page} of {categoriesData?.categories?.totalPages}
                </div>
                <button
                  className={buttonClass}
                  onClick={handleNextPage}
                  disabled={page >= categoriesData?.categories?.totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {view === Views.Risks && (
            <>
              {risksLoading && <p>Loading Risks...</p>}
              {risksError && <p>Error loading risks</p>}
              {risksData && (
                <Table
                  headings={['name', 'description', 'resolved', 'createdBy']}
                  data={risksData.risks.risks}
                />
              )}
              <div className="flex justify-between mt-4">
                <button
                  className={buttonClass}
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <div className="text-gray-700">
                  Page {page} of {risksData?.risks?.totalPages}
                </div>
                <button
                  className={buttonClass}
                  onClick={handleNextPage}
                  disabled={page >= risksData?.risks?.totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder="Go to page..."
              className="px-2 py-1 border border-gray-300 rounded"
            />
            <button
              onClick={handlePageInput}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
