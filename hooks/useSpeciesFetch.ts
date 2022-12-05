import { useEffect, useState } from 'react';

export default function usePlanetsFetch(page: number) {
  const [newSpecies, setNewSpecies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const URI = process.env.NEXT_PUBLIC_SWAPI_URI as string;
      try {
        setIsLoading(true);
        const res = await fetch(`${URI}/species?page=${page}`);
        const data = await res.json();
        setNewSpecies(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return { newSpecies, isError, isLoading, next, previous };
}
