import { useState } from "react";

export default function Inicio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (tipo) => {
    if (tipo === "privacidad") {
      setModalContent(
        'En "Todo Con Estilo" valoramos tu privacidad y nos comprometemos a proteger tus datos personales.'
      );
    } else if (tipo === "terminos") {
      setModalContent(
        'Bienvenido a Todo Con Estilo. Al utilizar nuestro sitio web o contactarnos para comprar productos, aceptas los términos y condiciones.'
      );
    }
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 bg-transparent text-center px-6 space-y-10 relative">

      {/* Frase animada */}
      <h2 className="text-4xl md:text-5xl font-playfair text-pink-900 max-w-4xl animate-aesthetic">
        "Tú estilo habla por sí solo, deja que nuestros bolsos sean tu mejor declaración."
      </h2>

      {/* Quiénes somos */}
      <div className="bg-white/80 shadow-xl p-6 rounded-2xl max-w-2xl text-gray-700">
        <h3 className="text-2xl font-semibold mb-4">¿Quiénes somos?</h3>
        <p className="text-lg">
          En <strong>Todo Con Estilo</strong> creemos que la elegancia está en los detalles.
          Ofrecemos <strong>bolsos</strong>, <strong>maletas</strong> y <strong>perfumes</strong> que realzan tu estilo personal.
          Cada producto está seleccionado para ayudarte a expresar quién eres sin decir una palabra.
        </p>
      </div>

      {/* Información adicional en tarjetas */}
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full justify-center">
        {/* Ubicación */}
        <div className="flex flex-col items-center bg-white/90 shadow-lg rounded-3xl p-6 max-w-xs text-gray-700 
                        cursor-pointer hover:shadow-pink-400/50 hover:scale-105 transition-transform transition-shadow duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.418 0 8-7.163 8-11a8 8 0 10-16 0c0 3.837 3.582 11 8 11z" />
          </svg>
          <h4 className="font-semibold text-xl mb-2">Tienda Física</h4>
          <p className="text-center">Benito Juárez S/N 24450 Sihochac, Mexico</p>
        </div>

        {/* WhatsApp */}
        <a
          href="https://chat.whatsapp.com/KeZQ5yHKWosJHmbWyIEynb"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white/90 shadow-lg rounded-3xl p-6 max-w-xs text-gray-700
                     cursor-pointer hover:shadow-pink-400/50 hover:scale-105 transition-transform transition-shadow duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.483A11.474 11.474 0 0012 0C5.373 0 0 5.372 0 12c0 2.122.555 4.093 1.52 5.84L0 24l6.456-1.52a11.944 11.944 0 005.543 1.42c6.627 0 12-5.373 12-12a11.56 11.56 0 00-3.48-8.417zM12 21.81a9.83 9.83 0 01-5.134-1.52l-.367-.217-3.83.902.81-3.726-.24-.382a9.958 9.958 0 01-1.546-5.222c0-5.486 4.463-9.95 9.95-9.95 2.664 0 5.17 1.04 7.06 2.928a9.875 9.875 0 012.887 7.023c0 5.486-4.463 9.95-9.95 9.95z" />
            <path d="M17.79 14.81l-2.34-.66a.408.408 0 00-.435.12l-1.11 1.36a8.255 8.255 0 01-3.83-3.83l1.36-1.11a.422.422 0 00.12-.435l-.66-2.34a.4.4 0 00-.397-.28H7.5a.4.4 0 00-.4.44c.03 1.85 1.04 4.43 3.72 7.11 2.68 2.68 5.26 3.69 7.11 3.72a.4.4 0 00.44-.4v-2.68a.4.4 0 00-.28-.4z" />
          </svg>
          <h4 className="font-semibold text-xl mb-2">Grupo WhatsApp</h4>
          <p className="text-pink-600 hover:underline">Únete ahora</p>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=100090777782116"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white/90 shadow-lg rounded-3xl p-6 max-w-xs text-gray-700
                     cursor-pointer hover:shadow-pink-400/50 hover:scale-105 transition-transform transition-shadow duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0H1.325C.594 0 0 .593 0 1.324v21.351C0 23.406.594 24 1.325 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.325V1.324C24 .593 23.406 0 22.675 0z" />
          </svg>
          <h4 className="font-semibold text-xl mb-2">Facebook</h4>
          <p className="text-pink-600 hover:underline">Visítanos</p>
        </a>
      </div>

      {/* Carrusel de imágenes */}
      <div className="flex flex-col items-center bg-white/90 shadow-lg rounded-3xl p-6 max-w-6xl w-full overflow-hidden mt-12 
                      cursor-pointer hover:shadow-pink-400/50 transition-shadow duration-300">
        <h4 className="font-semibold text-2xl mb-4 text-pink-800">Nuestros productos</h4>
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-6 animate-carousel whitespace-nowrap">
            {[...Array(2)].flatMap(() =>
              [1, 2, 3, 4, 5, 6].map((num) => (
                <img
                  key={`img-${num}-${Math.random()}`}
                  src={`/Img/${num}.jpg`}
                  alt={`Producto ${num}`}
                  className="h-60 w-auto rounded-xl shadow-md object-cover flex-shrink-0"
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-pink-100 text-pink-900 py-6 mt-16 border-t border-pink-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Todo Con Estilo. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button onClick={() => openModal("privacidad")} className="hover:underline">
              Política de privacidad
            </button>
            <button onClick={() => openModal("terminos")} className="hover:underline">
              Términos y condiciones
            </button>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-lg max-w-md text-left"
          >
            <h2 className="text-xl font-bold mb-2">Aviso Legal</h2>
            <p className="text-sm text-gray-700">{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}
