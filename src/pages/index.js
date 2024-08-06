import Head from 'next/head';
import Link from 'next/link';

// Redirección del lado del servidor
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/indexP', // Reemplaza '/new-page' con la ruta a la que quieres redirigir
      permanent: false, // Si es true, indica que la redirección es permanente (301)
    },
  };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Redirect Example</title>
        <meta name="description" content="Redirect example with Next.js" />
      </Head>

      <main>
        <h1>cargando</h1>
      </main>

      <footer>
      </footer>
    </div>
  );
}
