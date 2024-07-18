import { useEffect, useState } from "react";
import { AppState } from "../Redux/AppState";
import { useSelector } from "react-redux";

function useFetch<T>(
  fnQuery: () => Promise<T>,
  selector: (appState: AppState) => T
) {
  const result = useSelector<AppState, T>(selector);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      await fnQuery();
      setIsLoading(false);
    };
    getData();
  }, []);
  return { result, isLoading };
}
export default useFetch;
