import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';

export default function Home () {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Packages />
    </>
  );
}
