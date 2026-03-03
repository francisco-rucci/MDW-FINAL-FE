import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
            <h1 className="text-9xl font-extrabold text-orange-500 tracking-widest">404</h1>
            <p className="mt-8 text-gray-600 text-lg max-w-md">
                Parece que la ruta que estás buscando no existe o fue movida.
            </p>
            <Link 
                to="/" 
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default ErrorPage;