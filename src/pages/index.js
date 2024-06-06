import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Formulario from '@/components/formulario';

export default function Home () {
  return (
    <>
      <Hero />
      <Navbar />
      <Services />
      <Packages />
      <Formulario />
    </>
  );
}
