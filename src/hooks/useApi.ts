import { useState, useEffect } from "react";
import { api, setAuthToken } from "../api";

interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApi = <T>(endpoint: string, initialData: T): ApiResponse<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<T>(endpoint);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Erro ao carregar dados";
      setError(errorMessage);
      if (err.response?.status === 401) {
        setAuthToken(null);
        localStorage.removeItem("authToken");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get<T>(endpoint);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Erro ao recarregar dados";
      setError(errorMessage);
      if (err.response?.status === 401) {
        setAuthToken(null);
        localStorage.removeItem("authToken");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;