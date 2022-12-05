import { GetServerSideProps } from 'next';
import { Films } from '../../types';
import NameCard from '../../components/NameCard';
interface FilmsPage {
  films: Films[];
}

export default function FilmsPage({ films }: FilmsPage) {
  const allfilms = films.map((item) => {
    const id = item.url.substring(28).replace('/', '');
    return <NameCard id={id} name={item.title} key={item.url} slug='films' />;
  });
  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>Films</h1>
      <div className='flex flex-wrap justify-center'>{allfilms}</div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const URI = process.env.SWAPI_URI as string;
  const res = await fetch(`${URI}/films`);
  const data = await res.json();
  return {
    props: {
      films: data.results,
    },
  };
};
