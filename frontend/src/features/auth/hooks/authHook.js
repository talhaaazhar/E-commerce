import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginService, registerService } from "../services/authService";
import { setAuth, logout as logoutAction } from "../authSlice";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const login = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginService(values);
      const token = localStorage.getItem("access_token");
      dispatch(setAuth({ token, user }));
      return user;
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const user = await registerService(values);
      const token = localStorage.getItem("access_token");
      dispatch(setAuth({ token, user }));
      return user;
    } catch (err) {
      setError(err.response?.data?.detail || "Register failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { login, register, logout, loading, error };
};
