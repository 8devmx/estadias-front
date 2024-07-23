import HeroMain from '@/components/heromain';
import NavbarMain from '@/components/navbarmain';

export async function getServerSideProps(context) {
  
  const res = await fetch(`http://localhost:8000/landings/3`);
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
  const heroMain = JSON.parse(landing.hero);

  return (
    <>
      <HeroMain data={heroMain} />
      <NavbarMain/>  
    </>
  );
}