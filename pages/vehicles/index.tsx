import { GetServerSideProps } from 'next';
import { Vehicles } from '../../types';
import Pagination from '../../components/Pagination';
import NameCard from '../../components/NameCard';
import { useState, useEffect } from 'react';
import MsgError from '../../components/MsgError';
import Spinner from '../../components/Spinner';
import useVehiclesFetch from '../../hooks/useVehiclesFetch';

interface VehiclesPageProps {
  vehicles: Vehicles[];
}

export default function VehiclesPage({ vehicles }: VehiclesPageProps) {
  const [page, setPage] = useState(1);
  const { newVehicles, isError, isLoading, next, previous } =
    useVehiclesFetch(page);
  const [allVehicles, setAllVehicles] = useState(vehicles);

  useEffect(() => {
    setAllVehicles(newVehicles);
  }, [newVehicles]);

  const vehiclesmapped = allVehicles.map((item) => {
    const id = item.url.substring(31).replace('/', '');
    return <NameCard id={id} name={item.name} key={item.url} slug='vehicles' />;
  });

  if (isError) return <MsgError />;
  if (isLoading) return <Spinner />;

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>Vehicles</h1>
      <div className='flex flex-wrap justify-center'>{vehiclesmapped}</div>
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
  const res = await fetch(`${URI}/vehicles`);
  const data = await res.json();
  return {
    props: {
      vehicles: data.results,
    },
  };
};
