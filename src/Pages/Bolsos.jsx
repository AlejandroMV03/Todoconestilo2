import { useState } from "react";
import productosBolsos from "../data/bolsos";
import ProductCard from "../Componets/ProductCard";

export default function Bolsos() {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h2 className="text-3xl font-playfair text-center mb-10 text-pink-800">
        Nuestra colección de bolsos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosBolsos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onClick={setImagenAmpliada}
          />
        ))}
      </div>

      {imagenAmpliada && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setImagenAmpliada(null)}
        >
          <img
            src={imagenAmpliada.imagen}
            alt={imagenAmpliada.nombre}
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
