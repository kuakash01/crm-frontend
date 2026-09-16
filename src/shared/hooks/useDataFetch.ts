import { useEffect, useState, useCallback } from "react";

interface UseDataFetchOptions {
  skip?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseDataFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchOptions = {}
): UseDataFetchState<T> & { refetch: () => Promise<void> } {
  const { skip = false, onSuccess, onError } = options;
  const [state, setState] = useState<UseDataFetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (skip) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState({ data: null, loading: false, error });
      onError?.(error);
    }
  }, [fetchFn, skip, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
