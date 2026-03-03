import { useState } from "react";
import api from "../service/api";
import Joi from "joi";
import type { AxiosError } from "axios";


//TYPE
interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image?: string;
}

const schema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El título no puede estar vacío.",
        "string.min": "El título debe tener al menos 3 caracteres.",
        "string.max": "El título no puede superar los 255 caracteres.",
        "any.required": "El título es obligatorio.",
    }),
    description: Joi.string().min(5).required().messages({
        "string.empty": "La descripción no puede estar vacía.",
        "string.min": "La descripción debe tener al menos 5 caracteres.",
        "any.required": "La descripción es obligatoria.",
    }),
    ingredients: Joi.string().min(5).required().messages({
        "string.empty": "Los ingredientes no pueden estar vacíos.",
        "string.min": "Los ingredientes deben tener al menos 5 caracteres.",
        "any.required": "Los ingredientes son obligatorios.",
    }),
    instructions: Joi.string().min(10).required().messages({
        "string.empty": "Las instrucciones son obligatorias.",
        "string.min": "Las instrucciones deben tener al menos 10 caracteres.",
    }),
    image: Joi.string().uri().allow("").optional().messages({
        "string.uri": "La imagen debe ser una URL válida.",
    }),
});

// PROPS
interface Props {
    recipe: Recipe;
    onClose: () => void;
    onUpdated: () => void;
}

// COMPONENT
const EditRecipeModal = ({ recipe, onClose, onUpdated }: Props) => {
    const [title, setTitle] = useState<string>(recipe.title);
    const [description, setDescription] = useState<string>(recipe.description);
    const [ingredients, setIngredients] = useState<string>(recipe.ingredients);
    const [instructions, setInstructions] = useState<string>(recipe.instructions);
    const [image, setImage] = useState<string>(recipe.image || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        const { error } = schema.validate(
            { title, description, ingredients, instructions, image },
            { abortEarly: false }
        );

        if (error) {
            setErrors(error.details.map((d) => d.message));
            setLoading(false);
            return;
        }

        try {
            await api.patch(`/recipe/${recipe._id}`, {
                title,
                description,
                ingredients,
                instructions,
                image,
            });

            onUpdated(); // refresca lista
            onClose();   // cierra modal
        } catch (err) {
            const error = err as AxiosError<any>;

            if (
                error.response?.status === 400 &&
                error.response.data?.details
            ) {
                setErrors(error.response.data.details);
            } else if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(["Error desconocido al actualizar la receta."]);
            }

            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[450px] max-w-full animate-fadeIn">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Editar Receta: {recipe.title}
                </h3>

                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-3">
                        <ul className="list-disc list-inside text-sm">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="block mb-1 font-medium">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 rounded w-full focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 rounded w-full focus:ring-2 focus:ring-orange-400 outline-none"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Ingredientes</label>
                        <textarea
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="border p-2 rounded w-full focus:ring-2 focus:ring-orange-400 outline-none"
                            rows={3}
                        />
                    </div>

                    <textarea
                        placeholder="Instrucciones (Paso a paso)"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[100px]"
                    />

                    <div>
                        <label className="block mb-1 font-medium">URL de Imagen</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="border p-2 rounded w-full focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:opacity-60"
                        >
                            {loading ? "Actualizando..." : "Actualizar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditRecipeModal;