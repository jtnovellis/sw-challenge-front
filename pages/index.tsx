import Image from 'next/image';
import React from 'react';
import { IconSearch } from '@tabler/icons';
import useFormReducer from '../hooks/useFormReducer';

export default function Home() {
  const [searcher, dispatch] = useFormReducer();

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
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
    alert(JSON.stringify(searcher, null, 2));
    dispatch({ type: 'clear' });
  }

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold'>
        Search your favorite item
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex border border-white rounded-xl p-3 max-w-[38rem] mx-auto'
      >
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
      </form>
    </section>
  );
}
