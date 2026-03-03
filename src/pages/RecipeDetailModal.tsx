interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image?: string;
    isActive?: boolean;
    user?: {
        name?: string;
        lastName?: string;
        email?: string;
    };
}

interface Props {
    recipe: Recipe;
    onClose: () => void;
}

const RecipeDetailModal = ({ recipe, onClose }: Props) => {
    const ingredientsList = recipe.ingredients.split(',').map(i => i.trim());

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-300">
                
                {/* Botón Cerrar */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex justify-center items-center transition z-10"
                >
                    ✕
                </button>

                {/* Cabecera con Imagen */}
                <div className="relative h-64 md:h-80 w-full">
                    <img 
                        src={recipe.image || 'https://via.placeholder.com/800x400?text=Sin+Imagen'} 
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                        <h2 className="text-4xl font-bold text-white tracking-tight">{recipe.title}</h2>
                    </div>
                </div>

                {/* Contenido en Dos Columnas */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        
                        {/* Columna Izquierda: Ingredientes */}
                        <div className="md:col-span-1">
                            <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                                <span className="bg-orange-100 p-2 rounded-lg">🛒</span> Ingredientes
                            </h3>
                            <ul className="space-y-3">
                                {ingredientsList.map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700 border-b border-gray-100 pb-2">
                                        <span className="text-orange-500 mt-1">•</span>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna Derecha: Preparación */}
                        <div className="md:col-span-2 border-l border-gray-100 md:pl-10">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-gray-100 p-2 rounded-lg">👨‍🍳</span> Preparación
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                {recipe.instructions || "No hay instrucciones disponibles para esta receta."}
                            </p>
                            
                            <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <p className="text-sm text-orange-800 italic">
                                    "Esta receta fue compartida por <strong>{recipe.user?.name || 'un miembro de la comunidad'}</strong>"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
                    <button 
                        onClick={onClose}
                        className="bg-gray-800 hover:bg-black text-white px-8 py-2 rounded-xl transition font-medium"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailModal;