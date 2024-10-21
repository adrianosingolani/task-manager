import api, { DEFAULT_ERROR } from './api';

export const signupUser = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error(DEFAULT_ERROR);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error(DEFAULT_ERROR);
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error(DEFAULT_ERROR);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/me');
    return response.data.user;
  } catch (error) {
    throw new Error(DEFAULT_ERROR);
  }
};
