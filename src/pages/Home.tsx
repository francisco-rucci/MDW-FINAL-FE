import { useEffect, useState } from 'react';
import api from '../service/api';
import RecipeDetailModal from './RecipeDetailModal';

interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string,
    instructions: string,
    image: string;
}

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        api.get('/recipe')
            .then(response => {
                setRecipes(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al traer recetas:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <p className="text-center text-lg mt-10">
                Cargando recetas...
            </p>
        );
    }

return (
        <>
            <section className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Descubrí Recetas Increíbles
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Explorá recetas creadas por nuestra comunidad y encontrá tu próxima comida favorita.
                </p>
            </section>

            {/* RECIPES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            onClick={() => setViewRecipe(recipe)}
                            className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full"
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-xl font-bold mt-2 truncate">
                                {recipe.title}
                            </h2>
                            <p className="text-gray-600 mt-1 line-clamp-2">
                                {recipe.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">
                        No hay recetas disponibles todavía.
                    </p>
                )}
            </div>

            {/* MODAL DE DETALLE CONDICIONAL */}
            {viewRecipe && (
                <RecipeDetailModal 
                    recipe={viewRecipe} 
                    onClose={() => setViewRecipe(null)} 
                />
            )}
        </>
    );
};

export default Home;