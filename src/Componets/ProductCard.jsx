import { useState } from "react";

export default function ProductCard({
  producto,
  onClick,
  onAgregar,
  esAdmin = false,
  onEditar,
  onEliminar,
}) {
  const [editableNombre, setEditableNombre] = useState(producto.nombre || "");
  const [editablePrecio, setEditablePrecio] = useState(producto.precio || "");
  const [editableDisponible, setEditableDisponible] = useState(
    producto.disponible ?? true
  );
  const [editableImagen, setEditableImagen] = useState(producto.imagen || ""); // ✅ nueva línea
  const [editando, setEditando] = useState(false);

  const guardarCambios = () => {
    if (onEditar) {
      onEditar("nombre", editableNombre);
      onEditar("precio", editablePrecio);
      onEditar("disponible", editableDisponible);
      onEditar("imagen", editableImagen); // ✅ también se guarda imagen
    }
    setEditando(false);
  };

  return (
    <div className="bg-white/90 p-4 rounded-2xl shadow-lg hover:shadow-pink-300 transition duration-300 cursor-pointer">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-xl mb-4"
        onClick={() => onClick(producto)}
      />

      {editando ? (
        <>
          <input
            className="w-full mb-1 p-1 border rounded"
            value={editableNombre}
            onChange={(e) => setEditableNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className="w-full mb-1 p-1 border rounded"
            value={editablePrecio}
            onChange={(e) => setEditablePrecio(e.target.value)}
            placeholder="Precio"
          />
          <input
            className="w-full mb-1 p-1 border rounded"
            value={editableImagen}
            onChange={(e) => setEditableImagen(e.target.value)}
            placeholder="URL de la imagen" 
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={editableDisponible}
              onChange={() => setEditableDisponible(!editableDisponible)}
              className="mr-2"
            />
            Disponible
          </label>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            onClick={guardarCambios}
          >
            Guardar
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditando(false)}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <h3
            className="text-xl font-semibold text-pink-900 cursor-pointer"
            onClick={() => onClick(producto)}
          >
            {producto.nombre || "Sin nombre"}
          </h3>
          <p className="text-pink-700">{producto.precio || "Sin precio"}</p>
          <p
            className={`text-sm ${
              producto.disponible ? "text-green-600" : "text-red-500"
            }`}
          >
            {producto.disponible ? "Disponible" : "No disponible"}
          </p>

          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={onAgregar}
          >
            🛒 Agregar al carrito
          </button>

          {esAdmin && (
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => setEditando(true)}
              >
                Editar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => {
                  if (window.confirm("¿Seguro quieres eliminar este bolso?")) {
                    onEliminar();
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}