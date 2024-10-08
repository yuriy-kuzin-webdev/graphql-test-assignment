import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import CategoriesDropdown from './CategoriesDropdown';
import EditableCell from './EditableCell';

interface TableProps {
  headings: string[];
  data: any[];
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageInput: (inputPage: number) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, resolved: boolean) => void;
  onCreate: (newData: any) => void;
  onUpdate: (id: string, key: string, value: string) => void;
}

enum Status {
  Resolved = 'Resolved',
  Unresolved = 'Unresolved'
}

const Table: React.FC<TableProps> = ({
  headings,
  data,
  page,
  totalPages,
  onNextPage,
  onPreviousPage,
  onPageInput,
  onDelete,
  onStatusChange,
  onCreate,
  onUpdate,
}) => {
  const { user } = useAppContext();
  const [inputPage, setInputPage] = useState('');
  const [newItem, setNewItem] = useState<any>({
    createdBy: user?.username,
    ...(headings.includes('status') && { resolved: false })
  });

  const handlePageChange = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      onPageInput(pageNumber);
      setInputPage('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure ?')) {
      onDelete(id);
    }
  };

  const handleCreate = () => {
    if (!newItem['name']) {
      alert('Please provide name');
      return;
    }
    if (!newItem['description']) {
      alert('please provide description');
      return;
    }
    if (headings.includes('category') && !newItem['categoryId']) {
      alert('please select category');
      return;
    }
    onCreate(newItem);
    setNewItem({
      createdBy: user?.username,
      ...(headings.includes('status') && { resolved: false })
    });
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setNewItem({
      ...newItem,
      [key]: value,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="py-2 px-4 bg-gray-200 text-left capitalize">
                {heading}
              </th>
            ))}
            <th className="py-2 px-4 bg-gray-200 text-left capitalize">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {headings.map((heading, colIndex) => (
              <td key={colIndex} className="py-2 px-4">
                {heading === 'name' || heading === 'description' || heading === 'createdBy'
                  ? (
                    <input
                      type="text"
                      value={newItem[heading] || ''}
                      onChange={(e) => handleInputChange(heading, e.target.value)}
                      placeholder={`Enter ${heading}`}
                      className={`px-2 py-1 border border-gray-300 rounded w-full ${heading === 'createdBy' ? 'invisible' : ''}`}
                    />
                  ) : heading === 'category' ? (
                    <CategoriesDropdown onChange={(e) => handleInputChange('categoryId', e)}/>
                  ) : (
                    <select
                      value={newItem['resolved'] ? Status.Resolved : Status.Unresolved}
                      onChange={(e) => handleInputChange('resolved', e.target.value === Status.Resolved)}
                    >
                      <option value={Status.Unresolved}>{Status.Unresolved}</option>
                      <option value={Status.Resolved}>{Status.Resolved}</option>
                    </select>
                  )}
              </td>
            ))}
            <td>
              <button
                onClick={handleCreate}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Create
              </button>
            </td>
          </tr>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headings.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {headings.map((heading, colIndex) => 
                  heading === 'name' || heading === 'description' ? (
                    <EditableCell
                      key={colIndex}
                      item={item}
                      value={item[heading]}
                      field={heading}
                      onChange={onUpdate}
                    />
                  ) : (
                  <td key={colIndex} className="py-2 px-4">
                    {heading === 'status' ? (
                      <span
                        onClick={() => onStatusChange(item._id, item['resolved'])}
                        className={`cursor-pointer underline ${item['resolved'] ? 'text-green-500' : 'text-red-500'
                          }`}
                      >
                        {item['resolved'] ? Status.Resolved : Status.Unresolved}
                      </span>
                    ) : heading === 'category' ? (
                      item[heading].name
                    ) : (
                        item[heading]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onPreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="text-gray-700">
          Page {page} of {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            placeholder="Go to page..."
            className="px-2 py-1 border border-gray-300 rounded"
          />
          <button
            onClick={handlePageChange}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Go
          </button>
        </div>

        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onNextPage}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
