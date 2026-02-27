import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../service/api';

const Register = () => {
    const navigate = useNavigate();

    // Estado para guardar lo que el usuario escribe en los inputs
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    // Función para actualizar el estado cuando el usuario teclea
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Función que se ejecuta al hacer clic en "Registrarse"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Firebase: Registramos el correo y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const firebaseUid = userCredential.user.uid;

            // 2. Backend: Le mandamos el resto de los datos a Node.js para guardar en MongoDB
            await api.post('/user', { 
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                firebaseUid: firebaseUid,
                isActive: true
            });

            alert("¡Usuario creado con éxito!");
            navigate('/login');

        } catch (error: any) {
            console.error("Error al registrar:", error);
            if(error.code === 'auth/email-already-in-use') {
                alert("Ese correo electrónico ya está registrado. Probá iniciando sesión.");
            } else if (error.code === 'auth/weak-password') {
                alert("La contraseña debe tener al menos 6 caracteres.");
            } else {
                alert("Hubo un error en el registro. Revisá la consola.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Crear Cuenta</h2>
                <p className="text-gray-500 mt-2 text-sm">Unite a la comunidad de Recetas App</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input 
                            type="text" name="name" required
                            value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                            placeholder="Ej. Agustín"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input 
                            type="text" name="lastName" required
                            value={formData.lastName} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                            placeholder="Ej. Aguero"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input 
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="tu@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" name="password" required
                        value={formData.password} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="••••••••"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
                >
                    Registrarse
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                ¿Ya tenés una cuenta?{' '}
                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                    Iniciar Sesión
                </Link>
            </p>
        </div>
    );
};

export default Register;