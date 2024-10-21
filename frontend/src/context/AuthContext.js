"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser, getUserProfile } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (err) {
        setUser(null);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, [router]);

  const login = async (email, password) => {
    try {
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
      router.push('/tasks');
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
