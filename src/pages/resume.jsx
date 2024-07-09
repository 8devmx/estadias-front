import Head from 'next/head';
import Image from 'next/image';

const Resume = () => {
  return (
    <>
      <Head>
        <title>Currículum</title>
      </Head>
      <div className="container">
        <aside className="sidebar">
          <Image
            src="/path/to/your/photo.jpg" // Reemplaza con la ruta a tu foto
            alt="Foto de Clarence Taylor"
            width={150}
            height={150}
            className="profile-pic"
          />
          <h1>Clarence Taylor</h1>
          <p className="contact-info">
    
          </p>
        </aside>
        <main className="main-content">
          <div className="section">
            <h2>Acerca de</h2>
            <p>
              Tengo experiencia en aprovechar marcos ágiles para proporcionar una sinopsis sólida para resúmenes de alto nivel. Los enfoques iterativos de la estrategia corporativa fomentan el pensamiento colaborativo para promover la propuesta de valor general.
            </p>
          </div>
          <div className="section">
            <h2>Experiencia</h2>
            <ul>
              <li>
                <h3>Desarrollador Web Senior - Intelitec Solutions</h3>
                <p className="date">Marzo 2013 - Presente</p>
                <p>
                  Implementar estrategias de supervivencia que aseguren la dominación proactiva. Al final del día, avanzando, una nueva normalidad que ha evolucionado desde la generación X está en la pista hacia una solución en la nube simplificada. El contenido generado por el usuario en tiempo real tendrá múltiples puntos de contacto para la deslocalización.
                </p>
              </li>
              <li>
                <h3>Desarrollador Web - Intelitec Solutions</h3>
                <p className="date">Diciembre 2011 - Marzo 2013</p>
                <p>
                  Capitalizar las oportunidades para identificar una actividad de valor añadido para la prueba beta. Superar la brecha digital con clics adicionales de DevOps. La inmersión en nanotecnología a lo largo de la autopista de la información cerrará el ciclo centrándose únicamente en la línea de fondo.
                </p>
              </li>
            </ul>
          </div>
          <div className="section">
            <h2>Educación</h2>
            <ul>
              <li>
                <h3>Universidad de Colorado Boulder</h3>
                <p className="date">Agosto 2006 - Mayo 2010</p>
                <p>Licenciatura en Ciencias en Informática - Especialización en Desarrollo Web</p>
              </li>
              <li>
                <h3>James Buchanan High School</h3>
                <p className="date">Agosto 2002 - Mayo 2006</p>
                <p>Programa Magnet de Tecnología</p>
              </li>
            </ul>
          </div>
          <div className="section">
            <h2>Intereses</h2>
            <p>
              Además de ser desarrollador web, disfruto la mayor parte de mi tiempo al aire libre. En invierno, soy un esquiador ávido y escalador de hielo novato. Durante los meses más cálidos aquí en Colorado, disfruto del ciclismo de montaña, la escalada libre y el kayak.
            </p>
            <p>
              Cuando estoy obligado a estar en interiores, sigo una serie de películas y programas de televisión de ciencia ficción y fantasía, soy un chef aspirante y paso gran parte de mi tiempo libre explorando los últimos avances tecnológicos en el mundo del desarrollo web frontend.
            </p>
          </div>
        </main>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .sidebar {
          flex: 1;
          max-width: 250px;
          margin-right: 20px;
          text-align: center;
        }

        .profile-pic {
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .sidebar h1 {
          margin: 0;
          font-size: 1.8rem;
        }

        .contact-info {
          font-size: 0.9rem;
          color: #666;
        }

        .main-content {
          flex: 3;
        }

        .section {
          margin-bottom: 20px;
        }

        .section h2 {
          border-bottom: 2px solid #0070f3;
          padding-bottom: 5px;
          margin-bottom: 10px;
          font-size: 1.5rem;
        }

        .section p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .section ul {
          list-style: none;
          padding: 0;
        }

        .section ul li {
          margin-bottom: 10px;
        }

        .section ul li h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .date {
          font-size: 0.9rem;
          color: #999;
        }
      `}</style>
    </>
  );
};

export default Resume;
