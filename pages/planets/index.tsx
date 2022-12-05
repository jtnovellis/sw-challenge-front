import { GetServerSideProps } from 'next';
import { Planets } from '../../types';
import Pagination from '../../components/Pagination';
import NameCard from '../../components/NameCard';
import { useState, useEffect } from 'react';
import usePlanetFetching from '../../hooks/usePlanetFetching';
import MsgError from '../../components/MsgError';
import Spinner from '../../components/Spinner';

interface PlanetsPageProps {
  planets: Planets[];
}

export default function PlanetsPage({ planets }: PlanetsPageProps) {
  const [page, setPage] = useState(1);
  const { isError, isLoading, newPlanets, next, previous } =
    usePlanetFetching(page);
  const [allPlanets, setAllPlanets] = useState(planets);

  useEffect(() => {
    setAllPlanets(newPlanets);
  }, [newPlanets]);

  const planetsmapped = allPlanets.map((item) => {
    const id = item.url.substring(30).replace('/', '');
    return <NameCard id={id} name={item.name} key={item.url} slug='planets' />;
  });

  if (isError) return <MsgError />;
  if (isLoading) return <Spinner />;
  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>Planets</h1>
      <div className='flex flex-wrap justify-center'>{planetsmapped}</div>
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
  const res = await fetch(`${URI}/planets`);
  const data = await res.json();
  return {
    props: {
      planets: data.results,
    },
  };
};
