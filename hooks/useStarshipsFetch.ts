import { useEffect, useState } from 'react';

export default function useStarshipsFetch(page: number) {
  const [newStarships, setNewStarships] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const URI = process.env.NEXT_PUBLIC_SWAPI_URI as string;
      try {
        setIsLoading(true);
        const res = await fetch(`${URI}/starships?page=${page}`);
        const data = await res.json();
        setNewStarships(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return { newStarships, isError, isLoading, next, previous };
}
