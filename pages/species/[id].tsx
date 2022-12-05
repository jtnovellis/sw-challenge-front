import { GetServerSideProps } from 'next';
import { Species } from '../../types';
import DetailCard from '../../components/DetailCard';
import ListDetail from '../../components/ListDetail';

interface SpecieCharPageProps {
  specie: Species;
}

export default function SpecieCharPage({ specie }: SpecieCharPageProps) {
  return (
    <section className='p-4 lg:mt-40 sm:mt-36'>
      <DetailCard
        headSub='Classification'
        title={specie.name}
        subtitle={specie.classification}
        route='species'
      >
        <ul className='border-b p-2'>
          <li>
            <strong>Designation:</strong> {specie.designation}
          </li>
          <li>
            <strong>Average height:</strong> {specie.average_height}
          </li>
          <li>
            <strong>Skin Colors:</strong> {specie.skin_colors}
          </li>
          <li>
            <strong>Hair Colors:</strong> {specie.hair_colors}
          </li>
          <li>
            <strong>Eye Colors:</strong> {specie.eye_colors}
          </li>
          <li>
            <strong>Average lifespan:</strong> {specie.average_lifespan}
          </li>
          <li>
            <strong>Languaje:</strong> {specie.language}
          </li>
        </ul>
        <div className='flex flex-wrap justify-around'>
          <ListDetail
            list={specie.films}
            subsNum={28}
            name='Film'
            title='Films'
            slug='films'
          />
          <ListDetail
            list={specie.people}
            subsNum={29}
            name='Character'
            title='People'
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
    const res = await fetch(`${URI}/species/${params.id}`);
    data = await res.json();
  }
  return {
    props: {
      specie: data,
    },
  };
};
