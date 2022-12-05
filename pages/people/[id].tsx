import { GetServerSideProps } from 'next';
import Link from 'next/link';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';
import { People } from '../../types';

interface CharacterProps {
  character: People;
}

export default function Character({ character }: CharacterProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        headSub='Birth year'
        title={character.name}
        subtitle={character.birth_year}
        route='people'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Height:</strong> {character.height} cm
          </li>
          <li>
            <strong>Mass:</strong> {character.mass} kg
          </li>
          <li>
            <strong>Hair Color:</strong> {character.eye_color}
          </li>
          <li>
            <strong>Skin Color:</strong> {character.skin_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {character.eye_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {character.eye_color}
          </li>
          <li>
            <strong>Gender:</strong> {character.gender}
          </li>
        </ul>
        <div className='border-b p-2 text-center'>
          <Link
            href={`/homeworld/${character.homeworld
              .substring(30)
              .replace('/', '')}`}
          >
            Go to Homeworld
          </Link>
        </div>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={character.films}
            subsNum={28}
            name='Film'
            title='Films'
            slug='films'
          />
          <ListDetail
            list={character.species}
            subsNum={30}
            name='Specie'
            title='Species'
            slug='species'
          />
          <ListDetail
            list={character.vehicles}
            subsNum={31}
            name='Vehicle'
            title='Vehicles'
            slug='vehicles'
          />
          <ListDetail
            list={character.starships}
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
    const res = await fetch(`${URI}/people/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      character: data,
    },
  };
};
