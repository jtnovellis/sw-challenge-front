import { GetServerSideProps } from 'next';
import { Vehicles } from '../../types';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';

interface VehiclePageProps {
  vehicle: Vehicles;
}

export default function VehiclePage({ vehicle }: VehiclePageProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        headSub='Model'
        title={vehicle.name}
        subtitle={vehicle.model}
        route='vehicles'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Manufacturer:</strong> {vehicle.manufacturer}
          </li>
          <li>
            <strong>Cost in credits:</strong> {vehicle.cost_in_credits}
          </li>
          <li>
            <strong>Length:</strong> {vehicle.length}
          </li>
          <li>
            <strong>Max atmosphering speed:</strong>{' '}
            {vehicle.max_atmosphering_speed}
          </li>
          <li>
            <strong>Crew:</strong> {vehicle.crew}
          </li>
          <li>
            <strong>Passengers:</strong> {vehicle.passengers}
          </li>
          <li>
            <strong>Consumables:</strong> {vehicle.consumables}
          </li>
          <li>
            <strong>Cargo capacity:</strong> {vehicle.cargo_capacity}
          </li>
          <li>
            <strong>Class:</strong> {vehicle.vehicle_class}
          </li>
        </ul>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={vehicle.films}
            subsNum={28}
            name='Film'
            title='Films'
            slug='films'
          />
          <ListDetail
            list={vehicle.pilots}
            subsNum={29}
            name='Character'
            title='Pilots'
            slug='people'
          />
        </div>
      </DetailCard>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const URI = process.env.SWAPI_URI as string;
  let data;
  if (params) {
    const res = await fetch(`${URI}/vehicles/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      vehicle: data,
    },
  };
};
