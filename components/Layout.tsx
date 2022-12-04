import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Star Wars</title>
        <meta
          name='description'
          content='This is an application with the purpose of consuming the Star Wars API'
        />
        <meta name='author' content='Jairo Jair Toro Novellis' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='mt-20 sm:mt-24 max-w-6xl mx-auto mb-16'>{children}</main>
      <Footer />
    </>
  );
}
