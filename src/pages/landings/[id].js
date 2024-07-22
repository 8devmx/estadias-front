import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8000/landings/${id}`);
  const landing = await res.json();

  if (!landing) {
    return {
      notFound: true,
    };
  }

  return {
    props: { landing },
  };
}

export default function Home({ landing }) {
  const hero = JSON.parse(landing.hero);
  const services = JSON.parse(landing.services);
  const packages = JSON.parse(landing.packages);
  const logo = landing.logo; 
  
  return (
    <>
      <Hero data={hero} />
      <Navbar logo={logo} />
      <Services data={services} />
      <Packages data={packages} />
      <Form />
    </>
  );
}
