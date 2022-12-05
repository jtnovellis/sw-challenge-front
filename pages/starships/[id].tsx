import { GetServerSideProps } from 'next';
import { Starships } from '../../types';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';

interface StarshipCharacterPageProps {
  starship: Starships;
}

export default function StarshipCharacterPage({
  starship,
}: StarshipCharacterPageProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        headSub='Model'
        title={starship.name}
        subtitle={starship.model}
        route='starships'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Manufacturer:</strong> {starship.manufacturer} cm
          </li>
          <li>
            <strong>Cost in credits:</strong> {starship.cost_in_credits} kg
          </li>
          <li>
            <strong>Length:</strong> {starship.length}
          </li>
          <li>
            <strong>Max atmosphering speed:</strong>{' '}
            {starship.max_atmosphering_speed}
          </li>
          <li>
            <strong>Crew:</strong> {starship.crew}
          </li>
          <li>
            <strong>Passengers:</strong> {starship.passengers}
          </li>
          <li>
            <strong>Consumables:</strong> {starship.consumables}
          </li>
          <li>
            <strong>Hyperdrive rating:</strong> {starship.hyperdrive_rating}
          </li>
          <li>
            <strong>MGLT:</strong> {starship.MGLT}
          </li>
          <li>
            <strong>Class:</strong> {starship.starship_class}
          </li>
        </ul>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={starship.films}
            subsNum={28}
            name='Film'
            title='Films'
            slug='films'
          />
          <ListDetail
            list={starship.pilots}
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
    const res = await fetch(`${URI}/starships/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      starship: data,
    },
  };
};
