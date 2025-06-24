import { useState, useEffect } from "react";
import productosBolsos from "../data/bolsos";
import ProductCard from "../Componets/ProductCard";
import WhatsAppButton from "../Componets/WhatsAppButton";
import Carrito from "../Componets/Carrito";

import { auth, db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default function Bolsos() {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [cargandoDesdeFirebase, setCargandoDesdeFirebase] = useState(true);

  // 👉 Guardar carrito en Firebase
  const guardarCarritoEnFirebase = async (carritoActual) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "carritos", user.uid), {
        items: carritoActual,
        actualizado: new Date(),
      });
    } catch (error) {
      console.error("❌ Error al guardar carrito en Firebase:", error);
    }
  };

  // 👉 Escuchar cambios desde Firebase (solo si usuario está logueado)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        const localCarrito = localStorage.getItem("carrito");
        if (localCarrito) setCarrito(JSON.parse(localCarrito));
        setCargandoDesdeFirebase(false);
        return;
      }

      const docRef = doc(db, "carritos", user.uid);
      const unsub = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setCarrito(docSnap.data().items || []);
        } else {
          setCarrito([]);
        }
        setCargandoDesdeFirebase(false);
      });

      return () => unsub();
    });

    return () => unsubscribe();
  }, []);

  // 👉 Guardar en localStorage y Firebase cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (!cargandoDesdeFirebase) {
      guardarCarritoEnFirebase(carrito);
    }
  }, [carrito, cargandoDesdeFirebase]);

  // ➕ Agregar producto
  const agregarAlCarrito = (producto) => {
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
      const actualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([
        ...carrito,
        { ...producto, cantidad: 1, precio: Number(producto.precio) },
      ]);
    }
  };

  // ❌ Eliminar producto
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h2 className="text-3xl font-playfair text-center mb-10 text-pink-800 animate-aesthetic">
        Nuestra colección de bolsos
      </h2>

      <button
        onClick={() => setMostrarCarrito(true)}
        className="fixed top-6 right-6 bg-pink-600 text-white p-3 rounded-full shadow-lg z-50"
        title="Abrir carrito"
      >
        🛒 {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosBolsos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onClick={setImagenAmpliada}
            onAgregar={() => agregarAlCarrito(producto)}
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

      {mostrarCarrito && (
        <Carrito
          carrito={carrito}
          setCarrito={setCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          onCerrar={() => setMostrarCarrito(false)}
        />
      )}

      <WhatsAppButton />
    </div>
  );
}
