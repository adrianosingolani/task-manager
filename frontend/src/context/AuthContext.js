"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signupUser, loginUser, logoutUser, getUserProfile } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (err) {
        setUser(null);
        if (pathname !== '/login' && pathname !== '/signup') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, [router]);

  const signup = async (name, email, password) => {
    try {
      const newUser = await signupUser(name, email, password);
      setUser(newUser);
      router.push('/tasks');
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

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
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
