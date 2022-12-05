import { GetServerSideProps } from 'next';
import { Films } from '../../types';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';

interface FilmPageProps {
  film: Films;
}

export default function FilmPage({ film }: FilmPageProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        title={film.title}
        subtitle={film.episode_id}
        route='films'
        headSub='Episode'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Director:</strong> {film.director}
          </li>
          <li>
            <strong>Producer:</strong> {film.producer}
          </li>
          <li>
            <strong>Release date:</strong> {film.release_date}
          </li>
        </ul>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={film.characters}
            subsNum={29}
            name='Character'
            title='People'
            slug='people'
          />
          <ListDetail
            list={film.species}
            subsNum={30}
            name='Specie'
            title='Species'
            slug='species'
          />
          <ListDetail
            list={film.planets}
            subsNum={30}
            name='Planet'
            title='Planets'
            slug='planets'
          />
          <ListDetail
            list={film.vehicles}
            subsNum={31}
            name='Vehicle'
            title='Vehicles'
            slug='vehicles'
          />
          <ListDetail
            list={film.starships}
            subsNum={32}
            name='Starship'
            title='Starships'
            slug='starships'
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
    const res = await fetch(`${URI}/films/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      film: data,
    },
  };
};
