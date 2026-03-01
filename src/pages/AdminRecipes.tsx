import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import CreateRecipeModal from "./CreateRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import type { AxiosError } from "axios";

interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string;
    image?: string;
    user?: {
        name?: string;
        lastName?: string;
        email?: string;
    };
}

const AdminRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    const { currentUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Si no hay usuario redirección automática
    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    // FETCH
    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await api.get("/recipe");
            setRecipes(response.data.data);
        } catch (err) {
            const error = err as AxiosError;
            console.error("Error al traer recetas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchRecipes();
        }
    }, [currentUser]);

    // DELETE
    const handleDeleteHard = async () => {
        if (!selectedRecipe) return;

        try {
            await api.delete(`/recipe/hard/${selectedRecipe._id}`);
            closeDeleteModal();
            fetchRecipes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSoft = async () => {
        if (!selectedRecipe) return;

        try {
            await api.patch(`/recipe/soft/${selectedRecipe._id}`);
            closeDeleteModal();
            fetchRecipes();
        } catch (err) {
            console.error(err);
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setSelectedRecipe(null);
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Administrar Recetas
                    </h2>

                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow transition"
                    >
                        + Nueva Receta
                    </button>
                </div>

                {/* LISTA */}
                <div className="bg-white border border-gray-200 rounded-xl shadow divide-y">

                    {loading && (
                        <div className="p-10 text-center text-gray-500">
                            Cargando recetas...
                        </div>
                    )}

                    {!loading && recipes.length === 0 && (
                        <div className="p-10 text-center text-gray-500">
                            No hay recetas registradas.
                        </div>
                    )}

                    {!loading &&
                        recipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="flex justify-between items-center p-6 hover:bg-gray-50 transition"
                            >
                                <div className="flex items-center gap-4">
                                    {recipe.image && (
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {recipe.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {recipe.description}
                                        </p>

                                        {recipe.user && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                Creado por: {recipe.user.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedRecipe(recipe);
                                            setIsEditOpen(true);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedRecipe(recipe);
                                            setIsDeleteOpen(true);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* CREATE */}
            {isCreateOpen && (
                <CreateRecipeModal
                    onClose={() => setIsCreateOpen(false)}
                    onCreated={fetchRecipes}
                />
            )}

            {/* EDIT */}
            {isEditOpen && selectedRecipe && (
                <EditRecipeModal
                    recipe={selectedRecipe}
                    onClose={() => {
                        setIsEditOpen(false);
                        setSelectedRecipe(null);
                    }}
                    onUpdated={fetchRecipes}
                />
            )}

            {/* DELETE MODAL */}
            {isDeleteOpen && selectedRecipe && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                        <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
                            ¿Qué tipo de eliminación querés hacer?
                        </h3>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleDeleteSoft}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition"
                            >
                                Eliminación Lógica
                            </button>

                            <button
                                onClick={handleDeleteHard}
                                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
                            >
                                Eliminación Física
                            </button>

                            <button
                                onClick={closeDeleteModal}
                                className="border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRecipes;