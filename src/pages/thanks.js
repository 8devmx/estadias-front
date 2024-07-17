import Head from 'next/head';
import { useRouter } from 'next/router';

const Thanks = ({ name }) => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>Agradecimiento</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
        <div className="box">
          <h1 className="heading">¡Muchas gracias por tu solicitud, {name}!</h1>
          <p className="message">
            Te agradecemos por tu interés. Puedes revisar mi Curriculum Vitae haciendo clic en el botón de abajo.
          </p>
          <button className="cta-button" onClick={() => handleButtonClick('/resume')}>
            Ver Mi Curriculum Vitae
            <span className="cta-text">Redirigir a mi Curriculum Vitae</span>
          </button>
          <button className="button" onClick={() => handleButtonClick('/form')}>Volver a Inicio</button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          font-family: 'Arial', sans-serif;
          width: 100%;
          height: 100vh;
          margin: 0;
        }

        @media (min-width: 1200px) {
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        .box {
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 600px;
          width: 100%;
        }

        .heading {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
        }

        .message {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .cta-button,
        .button {
          display: block;
          width: 100%;
          padding: 15px 30px;
          font-size: 1.2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          margin-bottom: 10px;
        }

        .cta-button {
          background-color: #ff6b6b;
          color: #fff;
        }

        .cta-button:hover {
          background-color: #ff4c4c;
          transform: scale(1.05);
        }

        .cta-text {
          display: block;
          font-size: 1rem;
          color: #fff;
          margin-top: 5px;
        }

        .button {
          background-color: #333;
          color: #fff;
        }

        .button:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
};

Thanks.getInitialProps = async (ctx) => {
  const { query } = ctx;
  return { name: query.name || 'Invitado' };
};

export default Thanks;
