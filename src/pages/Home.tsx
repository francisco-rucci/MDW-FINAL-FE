import { useEffect, useState } from 'react';
import api from '../service/api';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/recipe') 
            .then(response => {
                // response.data es el objeto del backend { data: [...], error: false }
                // response.data.data es el array real de recetas que está en MongoDB
                setRecipes(response.data.data); 
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al traer recetas:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center">Cargando recetas...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.length > 0 ? (
                recipes.map((recipe: any) => (
                    <div key={recipe._id} className="border p-4 rounded-lg shadow">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
                        <p className="text-gray-600">{recipe.description}</p>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-3">No hay recetas disponibles todavía.</p>
            )}
        </div>
    );
};

export default Home;