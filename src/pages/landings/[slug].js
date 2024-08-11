// import Hero from '@/components/hero';
// import Navbar from '@/components/navbar';
// import Services from '@/components/services';
// import Packages from '@/components/packages';
// import Form from '@/components/form';
// import React from 'react';
// import Chatbot from '@/components/chatbot';

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const url = `${process.env.NEXT_PUBLIC_API_KEY}/landingslg/slug/${slug}`;

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       return { notFound: true }; 
//     }

//     const data = await res.json();

//     if (!data) {
//       return { notFound: true }; 
//     }

//     // Extraer company_id del objeto data
//     const company_id = data.company_id || null;

//     return {
//       props: { landing: data, company_id }, // Pasar company_id a las props
//     };
//   } catch (error) {
//     return { notFound: true }; 
//   }
// }

// export default function Home({ landing, company_id }) {
//   console.log('Landing Data:', landing);
//   console.log('Company ID:', company_id);  // Ahora debería mostrar el ID correcto

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
//       <Chatbot  data={Chatbot } />
//       <Form company_id={company_id} />
//     </>
//   );
// }



import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Packages from '@/components/packages';
import Form from '@/components/form';
import React from 'react';
import Chatbot from '@/components/chatbot';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const url = `${process.env.NEXT_PUBLIC_API_KEY}/landingslg/slug/${slug}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { notFound: true }; 
    }

    const data = await res.json();

    if (!data) {
      return { notFound: true }; 
    }

    // Extraer company_id y pasar slug
    const company_id = data.company_id || null;

    return {
      props: { landing: data, company_id, slug },
    };
  } catch (error) {
    return { notFound: true }; 
  }
}

export default function Home({ landing, company_id, slug }) {
  console.log('Landing Data:', landing);
  console.log('Company ID:', company_id);  // Ahora debería mostrar el ID correcto

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

      {/* Mostrar Chatbot solo si el slug es igual a 'unid' */}
      {slug === 'unid' && <Chatbot data={Chatbot} />}

      <Form company_id={company_id} />
    </>
  );
}
