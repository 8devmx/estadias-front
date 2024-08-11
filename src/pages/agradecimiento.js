import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ThankYou() {
    const router = useRouter();

    const goBack = () => {
        router.back(); 
    };

    return (
        <>
            <Head>
                <title>Thank You</title>
            </Head>
            <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('hero-main.jpg')" }}></div>
                 
                <div className="relative text-center p-10 bg-white rounded-lg shadow-lg z-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Gracias por tu registro!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        En unos momentos nos pondremos en contacto con ustedes.
                    </p>
                    <button 
                        onClick={goBack}
                        className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-900 border border-gray-800 rounded-lg transition duration-300 ease-in-out">
                        Regresar al inicio
                    </button>
                </div>
            </div>
        </>
    );
}
