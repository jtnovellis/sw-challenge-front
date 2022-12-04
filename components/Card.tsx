import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
}

export default function Card({ image, title }: CardProps) {
  return (
    <div className='relative m-4 shadow-gray-500 shadow-md'>
      <Image
        src={image}
        alt='item'
        height={200}
        width={300}
        className='opacity-60 w-[18rem] h-[10rem] cover'
      />
      <div className='absolute top-0 w-[18rem] h-[10rem] flex justify-center items-center'>
        <h2 className='font-extrabold text-4xl tracking-wide'>{title}</h2>
      </div>
    </div>
  );
}
