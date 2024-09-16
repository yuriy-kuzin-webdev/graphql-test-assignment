import React from 'react';

interface TableProps {
  headings: string[];
  data: Array<{ [key: string]: any }>;
}

const Table: React.FC<TableProps> = ({ headings, data }) => {
  console.log(data)
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
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headings.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {headings.map((heading, colIndex) => (
                  <td key={colIndex} className="py-2 px-4">
                    {item[heading]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
