import React, { useState } from 'react';
import { useAppContext } from '../context/Context';

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { login } = useAppContext();

  const handleLogin = () => {
    if (inputValue.trim()) {
      login({ username: inputValue.trim() });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
