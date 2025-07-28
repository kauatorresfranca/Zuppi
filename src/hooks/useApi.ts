import { useState, useEffect } from "react";
import { api } from "../api";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T>(endpoint);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get<T>(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao recarregar dados");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;
