// import Hero from '@/components/hero';
// import Navbar from '@/components/navbar';
// import Services from '@/components/services';
// import Packages from '@/components/packages';
// import Form from '@/components/form';

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const url = `http://localhost:8000/landingslg/slug/${slug}`;
//   // const url = `${process.env.API_URL}/landingslg/slug/${slug}`;

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

// export default function Home({ landing }) {
//   const hero = JSON.parse(landing.hero);
//   const services = JSON.parse(landing.services);
//   const packages = JSON.parse(landing.packages);
//   const logo = landing.logo;

//   return (
//     <>
//       <Hero data={hero} />
//       <Navbar logo={logo} />
//       <Services data={services} />
//       <Packages data={packages} />
//       <Form />
//     </>
//   );
// }



import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const url = `http://localhost:8000/landingslg/slug/${slug}`;
  // const url = `${process.env.API_URL}/landingslg/slug/${slug}`;

  try {
    console.log(`Fetching data from: ${url}`); // Log de la URL de la API

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Error fetching data: ${res.status} ${res.statusText}`); // Log del error HTTP
      return { notFound: true };
    }

    const data = await res.json();
    console.log(`Data received: ${JSON.stringify(data)}`); // Log de los datos recibidos

    if (!data) {
      console.error('No data received or data is null/undefined'); // Log de datos vacíos
      return { notFound: true };
    }

    return {
      props: { landing: data }, 
    };
  } catch (error) {
    console.error(`Fetch error: ${error.message}`); // Log del error de fetch
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
