import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES, GET_RISKS } from '../graphql/queries';
import { DELETE_CATEGORY, DELETE_RISK, UPDATE_RISK } from '../graphql/mutations';
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
  const limit = 10;

  const buttonClass = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const activeButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"

  const { 
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useQuery(GET_CATEGORIES, {
    variables: {
      page,
      limit
    },
    skip: view !== Views.Categories,
  });

  const { 
    data: risksData,
    loading: risksLoading,
    error: risksError,
    refetch: refetchRisks
  } = useQuery(GET_RISKS, {
    variables: { page, limit },
    skip: view !== Views.Risks,
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => refetchCategories(),
  });

  const [deleteRisk] = useMutation(DELETE_RISK, {
    onCompleted: () => refetchRisks(),
  });

  const [updateRisk] = useMutation(UPDATE_RISK, {
    onCompleted: () => refetchRisks(),
  });

  const handleLogout = () => {
    logout();
  };

  const handleNextPage = () => {
    const totalPages = view === Views.Categories 
      ? categoriesData?.categories?.totalPages 
      : risksData?.risks?.totalPages;
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handlePageInput = (inputPage: number) => {
    const totalPages = view === Views.Categories 
      ? categoriesData?.categories?.totalPages
      : risksData?.risks?.totalPages;
    if (inputPage >= 1 && inputPage <= totalPages) {
      setPage(inputPage);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  const handleDeleteCategory = (id: string) => deleteCategory({ variables: { id } });

  const handleDeleteRisk = (id: string) => deleteRisk({ variables: { id } });

  const handleStatusChange = (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    updateRisk({
      variables: { id, resolved: newStatus },
    });
  };

  useEffect(() => {
    setPage(1);
  }, [view]);

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
                  page={page}
                  totalPages={categoriesData.categories.totalPages}
                  onNextPage={handleNextPage}
                  onPreviousPage={handlePreviousPage}
                  onPageInput={handlePageInput}
                  onDelete={handleDeleteCategory}
                  onStatusChange={() => {}}
                />
              )}
            </>
          )}

          {view === Views.Risks && (
            <>
              {risksLoading && <p>Loading Risks...</p>}
              {risksError && <p>Error loading risks</p>}
              {risksData && (
                <Table
                  headings={['name', 'description', 'status', 'createdBy']}
                  data={risksData.risks.risks}
                  page={page}
                  totalPages={risksData.risks.totalPages}
                  onNextPage={handleNextPage}
                  onPreviousPage={handlePreviousPage}
                  onPageInput={handlePageInput}
                  onDelete={handleDeleteRisk}
                  onStatusChange={handleStatusChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
