import React, { createContext, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { WHO_AM_I } from '../graphql';

export interface User {
  id: string;
  username: string;
  email: string;
}
interface AppContext {
  user: User | null;
  fetching: boolean;
}

export const AppContext = createContext<AppContext>({
  user: null,
  fetching: false
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [result] = useQuery({
    query: WHO_AM_I
  });

  const { data, fetching } = result;

  useEffect(() => {
    if (!user && (data as User)?.id) setUser(data);
  }, [data, user]);

  const context: AppContext = {
    user,
    fetching
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
