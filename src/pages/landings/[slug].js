import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const url = `http://localhost:8000/landingslg/slug/${slug}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { notFound: true }; 
    }

    const data = await res.json();

    if (!data) {
      return { notFound: true }; 
    }

    return {
      props: { landing: data }, 
    };
  } catch (error) {
    return { notFound: true }; 
  }
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