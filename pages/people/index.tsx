import { GetServerSideProps } from 'next';
import { People } from '../../types';
import NameCard from '../../components/NameCard';
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import usePeopleFetching from '../../hooks/usePeopleFetching';
import Spinner from '../../components/Spinner';
import MsgError from '../../components/MsgError';

interface PeoplePageProps {
  people: People[];
}

export default function PeoplePage({ people }: PeoplePageProps) {
  const [page, setPage] = useState(1);
  const { isError, isLoading, newPeople, next, previous } =
    usePeopleFetching(page);
  const [characters, setCharacters] = useState(people);

  useEffect(() => {
    setCharacters(newPeople);
  }, [newPeople]);

  const actors = characters.map((item) => {
    const id = item.url.substring(29).replace('/', '');
    return <NameCard id={id} name={item.name} key={item.url} slug='people' />;
  });

  if (isError) return <MsgError />;
  if (isLoading) return <Spinner />;

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>People</h1>
      <div className='flex flex-wrap justify-center'>{actors}</div>
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
  const res = await fetch(`${URI}/people`);
  const data = await res.json();
  return {
    props: {
      people: data.results,
    },
  };
};
