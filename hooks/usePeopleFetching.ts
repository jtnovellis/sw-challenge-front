import { useEffect, useState } from 'react';

export default function usePeopleFetching(page: number) {
  const [newPeople, setNewPeople] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const URI = process.env.NEXT_PUBLIC_SWAPI_URI as string;
      try {
        setIsLoading(true);
        const res = await fetch(`${URI}/people?page=${page}`);
        const data = await res.json();
        setNewPeople(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return { newPeople, isError, isLoading, next, previous };
}
