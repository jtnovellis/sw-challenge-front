import { GetServerSideProps } from 'next';
import { Starships } from '../../types';
import Pagination from '../../components/Pagination';
import NameCard from '../../components/NameCard';
import { useState, useEffect } from 'react';
import MsgError from '../../components/MsgError';
import Spinner from '../../components/Spinner';
import useStarshipsFetch from '../../hooks/useStarshipsFetch';

interface StarshipsPageProps {
  starships: Starships[];
}

export default function StarshipsPage({ starships }: StarshipsPageProps) {
  const [page, setPage] = useState(1);
  const { newStarships, isError, isLoading, next, previous } =
    useStarshipsFetch(page);
  const [allStarships, setAllStarships] = useState(starships);

  useEffect(() => {
    setAllStarships(newStarships);
  }, [newStarships]);

  const starshipsmapped = allStarships.map((item) => {
    const id = item.url.substring(32).replace('/', '');
    return (
      <NameCard id={id} name={item.name} key={item.url} slug='starships' />
    );
  });

  if (isError) return <MsgError />;
  if (isLoading) return <Spinner />;

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>Starships</h1>
      <div className='flex flex-wrap justify-center'>{starshipsmapped}</div>
      <Pagination
        next={next}
        previous={previous}
        page={page}
        setPage={setPage}
      />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const URI = process.env.SWAPI_URI as string;
  const res = await fetch(`${URI}/starships`);
  const data = await res.json();
  return {
    props: {
      starships: data.results,
    },
  };
};
