import Head from 'next/head';

export default function ThankYou() {
    return (
        <>
            <Head>
                <title>Thank You</title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Gracias por completar tu perfil!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Haz actualizado correctamente tu CV
                    </p>
                    <a href="#" className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-900 border border-gray-800 rounded-lg transition duration-300 ease-in-out">
                        Ver tu CV
                    </a>
                </div>
            </div>
        </>
    );
}
