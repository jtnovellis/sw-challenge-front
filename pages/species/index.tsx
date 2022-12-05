import { GetServerSideProps } from 'next';
import Pagination from '../../components/Pagination';
import MsgError from '../../components/MsgError';
import Spinner from '../../components/Spinner';
import { Species } from '../../types';
import NameCard from '../../components/NameCard';
import { useState, useEffect } from 'react';
import useSpeciesFetch from '../../hooks/useSpeciesFetch';

interface SpeciesPageProps {
  species: Species[];
}

export default function SpeciesPage({ species }: SpeciesPageProps) {
  const [page, setPage] = useState(1);
  const { isError, isLoading, newSpecies, next, previous } =
    useSpeciesFetch(page);
  const [SpeciesState, setSpeciesState] = useState(species);

  useEffect(() => {
    setSpeciesState(newSpecies);
  }, [newSpecies]);

  const planetsmapped = SpeciesState.map((item) => {
    const id = item.url.substring(30).replace('/', '');
    return <NameCard id={id} name={item.name} key={item.url} slug='species' />;
  });

  if (isError) return <MsgError />;
  if (isLoading) return <Spinner />;

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>Species</h1>
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
  const res = await fetch(`${URI}/species`);
  const data = await res.json();
  return {
    props: {
      species: data.results,
    },
  };
};
