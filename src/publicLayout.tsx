import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto h-[80px] px-6 flex justify-between items-center relative">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-orange-500 tracking-tight"
                    >
                        Recetas App
                    </Link>

                    {/* HAMBURGUESA */}
                    <div className="md:hidden absolute top-8 right-4 z-50">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex flex-col w-6 h-6 justify-center items-center gap-1"
                        >
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                        </button>
                    </div>

                    {/* NAV */}
                    <nav>
                        <ul
                            className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center font-medium
              absolute md:static top-[80px] left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300
              ${menuOpen ? "block" : "hidden"} md:flex`}
                        >
                            <li>
                                <Link
                                    to="/"
                                    onClick={handleLinkClick}
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    Inicio
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/login"
                                    onClick={handleLinkClick}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    onClick={handleLinkClick}
                                    className="px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-sm"
                                >
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* MAIN */}
            <main className="flex-grow pt-[120px] px-6 max-w-7xl mx-auto w-full">

                <section className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Descubrí Recetas Increíbles
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Explorá recetas creadas por nuestra comunidad y encontrá tu próxima comida favorita.
                    </p>
                </section>

                <Outlet />

            </main>

            {/* FOOTER */}
            <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200 bg-white">
                TP FINAL - MDW
            </footer>
        </div>
    );
};

export default PublicLayout;