import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';

export async function getStaticProps() {

  const res = await fetch('http://localhost:8000/landings/')
  const landing = await res.json()
  return { props: { landing } }
}

export default function Home ({landing}) {
  const hero = JSON.parse(landing.hero)
  const services = JSON.parse(landing.services)
  const packages = JSON.parse(landing.packages)
  
  

  return (
    <>
      <Hero data={hero} />
      <Navbar />
      <Services data={services} />
      <Packages data={packages} />
      <Form />
    </>
  );
}