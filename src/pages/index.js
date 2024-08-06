import Hero from '@/components/heromain';
import Navbar from '@/components/navbarmain';

// export async function getServerSideProps(context) {

// const url = `http://localhost:8000/landingslg/slug/tech-pech`;

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       return { notFound: true }; 
//     }

//     const data = await res.json();

//     if (!data) {
//       return { notFound: true }; 
//     }

//     return {
//       props: { landing: data }, 
//     };
//   } catch (error) {
//     return { notFound: true }; 
//   }
// }

export default function Home({ landing }) {
  // const hero = JSON.parse(landing.hero);
  // const logo = landing.logo;

  return (
    <>
    <h1>Cargando</h1>
        {/* <Hero data={hero} />
        <Navbar logo={logo} /> */}
    </>
    );
}