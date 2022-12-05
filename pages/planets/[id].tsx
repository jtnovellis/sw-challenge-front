import { GetServerSideProps } from 'next';
import { Planets } from '../../types';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';

interface PlanetPageProps {
  planet: Planets;
}

export default function PlanetPage({ planet }: PlanetPageProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        headSub='Population'
        title={planet.name}
        subtitle={planet.population}
        route='planets'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Rotation period:</strong> {planet.rotation_period}
          </li>
          <li>
            <strong>Orbital period:</strong> {planet.orbital_period}
          </li>
          <li>
            <strong>Diameter:</strong> {planet.diameter} km
          </li>
          <li>
            <strong>Climate:</strong> {planet.climate}
          </li>
          <li>
            <strong>Gravity:</strong> {planet.gravity}
          </li>
          <li>
            <strong>Terrain:</strong> {planet.terrain}
          </li>
          <li>
            <strong>Surface water:</strong> {planet.surface_water}
          </li>
        </ul>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={planet.films}
            subsNum={28}
            name='Film'
            title='Films'
            slug='films'
          />
          <ListDetail
            list={planet.residents}
            subsNum={29}
            name='Character'
            title='Residents'
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
    const res = await fetch(`${URI}/planets/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      planet: data,
    },
  };
};
