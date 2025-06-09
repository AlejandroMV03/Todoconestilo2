import { useState } from "react";

const productos = [
  {
    id: 1,
    nombre: "Bolso Elegante",
    precio: "$599",
    disponible: true,
    imagen: "/Img/1.jpg",
  },
  {
    id: 2,
    nombre: "Bolso Casual",
    precio: "$450",
    disponible: true,
    imagen: "/Img/2.jpg",
  },
  {
    id: 3,
    nombre: "",
    precio: "",
    disponible: false,
    imagen: "/Img/.jpg",
  },
  {
    id: 4,
    nombre: "Bolso Clásico",
    precio: "$390",
    disponible: true,
    imagen: "/Img/4.jpg",
  },
  {
    id: 5,
    nombre: "Bolso Moderno",
    precio: "$530",
    disponible: true,
    imagen: "/Img/5.jpg",
  },
  {
    id: 6,
    nombre: "",
    precio: "",
    disponible: false,
    imagen: "/Img/.jpg",
  },
];

export default function Bolsos() {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h2 className="text-3xl font-playfair text-center mb-10 text-pink-800">
        Nuestra colección de bolsos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white/90 p-4 rounded-2xl shadow-lg hover:shadow-pink-300 transition duration-300 cursor-pointer"
            onClick={() => setImagenAmpliada(producto)}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-900">
              {producto.nombre}
            </h3>
            <p className="text-pink-700">{producto.precio}</p>
            <p className={`text-sm ${producto.disponible ? "text-green-600" : "text-red-500"}`}>
              {producto.disponible ? "Disponible" : "No disponible"}
            </p>
          </div>
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