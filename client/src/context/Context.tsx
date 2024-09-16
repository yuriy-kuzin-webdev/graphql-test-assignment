import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  username: string;
}

interface ContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
};
