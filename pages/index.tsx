import { useState } from 'react';
import React from 'react';
import { IconSearch } from '@tabler/icons';
import useFormReducer from '../hooks/useFormReducer';
import Card from '../components/Card';
import Link from 'next/link';
import { Filters } from '../types';
import Spinner from '../components/Spinner';
import MsgError from '../components/MsgError';
import NameCard from '../components/NameCard';

export const pages = [
  {
    label: 'People',
    link: '/people',
    image: '/people.png',
  },
  {
    label: 'Films',
    link: '/films',
    image: '/scale.jpeg',
  },
  {
    label: 'Starships',
    link: '/starships',
    image: '/starships.webp',
  },
  {
    label: 'Vehicles',
    link: '/vehicles',
    image: '/vehicles.jpeg',
  },
  {
    label: 'Planets',
    link: '/planets',
    image: '/planets.jpg',
  },
  {
    label: 'Species',
    link: '/species',
    image: '/species.jpeg',
  },
];

export default function Home() {
  const [searcher, dispatch] = useFormReducer();
  const [filter, setFilter] = useState<Filters[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    if (searcher.query !== 'empty') {
      dispatch({ type: 'error', payload: false });
    }
    dispatch({
      type: 'changeOption',
      payload: {
        name,
        value,
      },
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searcher.query === 'empty') {
      dispatch({ type: 'error', payload: true });
    } else {
      try {
        setLoading(true);
        const URI = process.env.NEXT_PUBLIC_SWAPI_URI as string;
        const res = await fetch(
          `${URI}/${searcher.query}?search=${searcher.name}`
        );
        const data = await res.json();
        setFilter(data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  if (error) return <MsgError />;
  if (loading) return <Spinner />;

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3'>
        Search your favorite item
      </h1>
      <form
        onSubmit={handleSubmit}
        className='border border-white rounded-xl p-3 max-w-[38rem] mx-auto'
      >
        <div className='flex'>
          <select
            value={searcher.query}
            name='query'
            onChange={handleChange}
            className='bg-gray-800 rounded-xl p-2'
          >
            <option value='empty'>-Options-</option>
            <option value='people'>People</option>
            <option value='films'>Films</option>
            <option value='planets'>Planets</option>
            <option value='vehicles'>Vehicles</option>
            <option value='starships'>Starships</option>
            <option value='species'>Species</option>
          </select>
          <div className='bg-gray-800 rounded-xl py-1 px-2 ml-1 flex justify-between items-center w-full'>
            <input
              placeholder='Type a name'
              type='text'
              name='name'
              className='bg-gray-800 focus:outline-none px-2 '
              value={searcher.name}
              onChange={handleChange}
            />
            <button>
              <IconSearch size={18} />
            </button>
          </div>
        </div>
        {searcher.error && (
          <p className='text-red-500 text-xs text-center'>
            You have to select an option to search
          </p>
        )}
      </form>
      <div className='flex flex-wrap justify-center mt-6 lg:mt-11'>
        {filter.length > 0
          ? filter.map((item) => {
              let id = '';
              let slug = searcher.query;
              let name = searcher.query === 'films' ? item.title : item.name;
              if (searcher.query === 'people') {
                id = item.url.substring(29).replace('/', '');
              } else if (searcher.query === 'planets') {
                id = item.url.substring(30).replace('/', '');
              } else if (searcher.query === 'films') {
                id = item.url.substring(28).replace('/', '');
              } else if (searcher.query === 'species') {
                id = item.url.substring(30).replace('/', '');
              } else if (searcher.query === 'starships') {
                id = item.url.substring(32).replace('/', '');
              } else if (searcher.query === 'vehicles') {
                id = item.url.substring(31).replace('/', '');
              }
              return (
                <NameCard id={id} name={name} key={item.url} slug={slug} />
              );
            })
          : pages.map((item) => {
              return (
                <Link
                  href={item.link}
                  key={item.label}
                  className='transform hover:translate-y-2 transition-all'
                >
                  <Card title={item.label} image={item.image} />
                </Link>
              );
            })}
      </div>
    </section>
  );
}
