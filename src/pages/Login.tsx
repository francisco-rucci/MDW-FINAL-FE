import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import type { RootState, AppDispatch } from '../store/store';
import { loginUser } from '../store/authSlice';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    // Leemos TODO de Redux (el usuario, si está cargando, y los errores)
    const { currentUser, loading, error } = useSelector((state: RootState) => state.auth);

    // Estado local solo para lo que el usuario escribe
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    if (currentUser) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lo pasamos a Redux y él se encarga de Firebase
        dispatch(loginUser({ email: credentials.email, password: credentials.password }));
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Bienvenido de nuevo</h2>
                <p className="text-gray-500 mt-2 text-sm">Ingresá a tu cuenta de Recetas App</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input 
                        type="email" name="email" required
                        value={credentials.email} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="tu@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" name="password" required
                        value={credentials.password} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                        {error}
                    </p>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm ${
                        loading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                ¿No tenés una cuenta?{' '}
                <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                    Registrate acá
                </Link>
            </p>
        </div>
    );
};

export default Login;