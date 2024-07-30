import Head from 'next/head';

export default function ThankYou() {
    return (
        <>
            <Head>
                <title>Thank You</title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://tinyurl.com/5cc8ykvd')" }}>
                <div className="text-center p-10 bg-white bg-opacity-90 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-blue-700 mb-4" style={{ textShadow: "1px 1px yellow" }}>🎉¡Gracias por tu postulación!🎉</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.
                    </p>
                    <a href="/formCV" className="inline-block px-6 py-2 text-white bg-blue-700 hover:bg-blue-800 border border-blue-700 rounded-lg transition duration-300 ease-in-out">
                        Completa tu CV
                    </a>
                </div>
            </div>
        </>
    );
}
