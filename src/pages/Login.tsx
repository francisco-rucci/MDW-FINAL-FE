import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login = () => {
    const navigate = useNavigate();

    // Estado para guardar las credenciales
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        // Limpiamos el error si el usuario vuelve a escribir
        if (errorMsg) setErrorMsg('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Magia de Firebase: Verificamos credenciales
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            
            // Si pasa esta línea, el login fue exitoso. 
            // Por ahora lo mandamos al inicio, luego lo cambiaremos a la ruta privada del CRUD
            navigate('/'); 

        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrorMsg('Correo o contraseña incorrectos.');
            } else {
                setErrorMsg('Hubo un error al intentar iniciar sesión.');
            }
        }
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

                {/* Mensaje de error visual si falla el login */}
                {errorMsg && (
                    <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                        {errorMsg}
                    </p>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
                >
                    Iniciar Sesión
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