import Image from 'next/image';
import React from 'react';
import { IconSearch } from '@tabler/icons';
import useFormReducer from '../hooks/useFormReducer';
import Card from '../components/Card';
import Link from 'next/link';

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searcher.query === 'empty') {
      dispatch({ type: 'error', payload: true });
    } else {
      alert(JSON.stringify(searcher, null, 2));
      dispatch({ type: 'clear' });
    }
  }

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
        {pages.map((item) => {
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
