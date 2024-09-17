import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES_IDS } from '../graphql/queries';

interface DropDownProps {
  onChange: (id: string) => void;
}

const CategoriesDropdown: React.FC<DropDownProps> = ({ onChange }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [fetchCategories, { loading, error }] = useLazyQuery(GET_CATEGORIES_IDS);

  const fetchAllCategories = async (page = 1, limit = 5) => {
    const response = await fetchCategories({
      variables: {
        page,
        limit,
      },
    });

    const newCategories = response?.data?.categories?.categories || [];
    const totalPages = response?.data?.categories?.totalPages || 1;

    setCategories((prevCategories) => [...prevCategories, ...newCategories]);

    if (page < totalPages) {
      fetchAllCategories(page + 1, limit);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesDropdown;
