import Link from 'next/link';

interface ListDetailProps {
  list: Array<string>;
  subsNum: number;
  name: string;
  title: string;
}

export default function ListDetail({
  list,
  subsNum,
  name,
  title,
}: ListDetailProps) {
  return (
    <div className='m-3 w-[15rem]'>
      <h2 className='font-bold text-lg'>{title}</h2>
      <ul>
        {list.length > 0 ? (
          list.map((item) => {
            const id = item.substring(subsNum).replace('/', '');
            return (
              <li key={item} className='border mb-1 p-1 rounded-lg'>
                <Link href={`/films/${id}`}>
                  {name}: {id}
                </Link>
              </li>
            );
          })
        ) : (
          <li>There is not {title}</li>
        )}
      </ul>
    </div>
  );
}
