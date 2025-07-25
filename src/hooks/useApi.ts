import { useState, useEffect } from "react";
import { api } from "../api";

interface ApiResponse<T> {
  data: T; // Tipo genérico T, que pode ser um array ou objeto
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApi = <T>(
  endpoint: string,
  initialData: T = [] as any
): ApiResponse<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T>(endpoint); // Especifica o tipo T
        setData(response);
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
      const response = await api.get<T>(endpoint); // Especifica o tipo T
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao recarregar dados");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;
