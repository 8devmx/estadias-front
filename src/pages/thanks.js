import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Forms.module.css'; // Importa el archivo CSS Module

const Thanks = ({ name }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/resume'); // Ajusta la ruta para redirigir a resume.jsx

  return (
    <>
      <Head>
        <title>Agradecimiento</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.heading}>Gracias, {name}</h1>
          <p className={styles.text}>Terminar en CV</p>
          <button className={styles.button} onClick={handleButtonClick}>Aceptar</button>
        </div>
      </div>
    </>
  );
};

// Obtener las props iniciales
Thanks.getInitialProps = async (ctx) => {
  const { query } = ctx;
  return { name: query.name || 'Invitado' };
};

export default Thanks;
