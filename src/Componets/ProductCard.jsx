export default function ProductCard({ producto, onClick, onAgregar }) {
  return (
    <div
      className="bg-white/90 p-4 rounded-2xl shadow-lg hover:shadow-pink-300 transition duration-300 cursor-pointer"
      // Sólo el clic en la imagen o nombre va a ampliar la imagen, no todo el div
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-xl mb-4"
        onClick={() => onClick(producto)} // clic para ampliar
      />
      <h3
        className="text-xl font-semibold text-pink-900 cursor-pointer"
        onClick={() => onClick(producto)} // clic para ampliar
      >
        {producto.nombre || "Sin nombre"}
      </h3>
      <p className="text-pink-700">{producto.precio || "Sin precio"}</p>
      <p className={`text-sm ${producto.disponible ? "text-green-600" : "text-red-500"}`}>
        {producto.disponible ? "Disponible" : "No disponible"}
      </p>

      {/* Botón Agregar al carrito */}
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onClick={onAgregar}
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
}

