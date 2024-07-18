import Head from 'next/head';

export default function ThankYou() {
    return (
        <>
            <Head>
                <title>Thank You</title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="text-center p-10 bg-white rounded-lg shadow-xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Gracias por tu postulación!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.
                    </p>
                    <a href="/admin/job" className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Volver al inicio
                    </a>
                </div>
            </div>
        </>
    );
}
