import React, { useEffect, useState, createContext } from 'react';
import { authConfig } from './config';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    authConfig.auth().onAuthStateChanged((users) => {
      setUser(users);
      setWaiting(false);
    });
  }, []);

  if (waiting) {
    return <>Carregando...</>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
