
export default function ProductCard({ producto, onClick }) {
  return (
    <div
      className="bg-white/90 p-4 rounded-2xl shadow-lg hover:shadow-pink-300 transition duration-300 cursor-pointer"
      onClick={() => onClick(producto)}
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-semibold text-pink-900">
        {producto.nombre || "Sin nombre"}
      </h3>
      <p className="text-pink-700">{producto.precio || "Sin precio"}</p>
      <p className={`text-sm ${producto.disponible ? "text-green-600" : "text-red-500"}`}>
        {producto.disponible ? "Disponible" : "No disponible"}
      </p>
    </div>
  );
}
