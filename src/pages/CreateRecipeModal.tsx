import { useState } from "react";
import Joi from "joi";
import api from "../service/api";

const schema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El título es obligatorio.",
        "string.min": "El título debe tener al menos 3 caracteres.",
    }),
    description: Joi.string().min(5).required().messages({
        "string.empty": "La descripción es obligatoria.",
        "string.min": "La descripción debe tener al menos 5 caracteres.",
    }),
    ingredients: Joi.string().min(5).required().messages({
        "string.empty": "Los ingredientes son obligatorios.",
        "string.min": "Los ingredientes deben tener al menos 5 caracteres.",
    }),
    instructions: Joi.string().min(10).required().messages({
        "string.empty": "Las instrucciones son obligatorias.",
        "string.min": "Las instrucciones deben tener al menos 10 caracteres.",
    }),
    image: Joi.string().uri().allow("").optional().messages({
        "string.uri": "La imagen debe ser una URL válida.",
    }),
});

interface Props {
    onClose: () => void;
    onCreated: () => void;
}

const CreateRecipeModal = ({ onClose, onCreated }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

const handleSubmit = async (e: React.FormEvent) => {
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
        await api.post("/recipe", {
            title,
            description,
            ingredients,
            instructions,
            image,
        });

        setLoading(false);
        onCreated();
        onClose();
    } catch (error: any) {
        setLoading(false);
        if (error.response?.data?.details) {
            setErrors(error.response.data.details);
        } else {
            setErrors([error.response?.data?.message || "Error al crear la receta."]);
        }
    }
};

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] relative">

                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Crear Nueva Receta
                </h3>

                {/* Errores */}
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        <ul className="list-disc list-inside">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <textarea
                        placeholder="Ingredientes (separados por coma)"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <textarea
                        placeholder="Instrucciones (Paso a paso)"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[100px]"
                    />

                    <input
                        type="text"
                        placeholder="URL de imagen (opcional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div className="flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition shadow"
                        >
                            {loading ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipeModal;