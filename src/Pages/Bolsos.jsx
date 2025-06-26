import { useState, useEffect } from "react";
import productosBolsos from "../data/bolsos";
import ProductCard from "../Componets/ProductCard";
import WhatsAppButton from "../Componets/WhatsAppButton";
import Carrito from "../Componets/Carrito";
import { useCarrito } from "../CarritoContext";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import { useAuth } from "../context/AuthContext"; // ✅ nuevo import

export default function Bolsos() {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { carrito, setCarrito } = useCarrito();
  const [todosLosBolsos, setTodosLosBolsos] = useState([]);
  const [bolsosRemotos, setBolsosRemotos] = useState([]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaUrlImagen, setNuevaUrlImagen] = useState(""); // CAMBIO: URL en vez de archivo
  const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState(true);

  const { user } = useAuth(); // ✅ obtenemos el usuario desde el contexto
  const esAdmin = user?.email === "federicovillacis12@gmail.com";

  const bolsosCollectionRef = collection(db, "Bolsos");

  const cargarBolsos = async () => {
    try {
      const snapshot = await getDocs(bolsosCollectionRef);
      const dataRemota = snapshot.docs.map((doc) => ({
        idDoc: doc.id,
        ...doc.data(),
      }));
      setBolsosRemotos(dataRemota);

      const combinados = [
        ...productosBolsos,
        ...dataRemota.filter(
          (remoto) => !productosBolsos.some((local) => local.id === remoto.id)
        ),
      ];
      setTodosLosBolsos(combinados);
    } catch (error) {
      console.error("Error al cargar bolsos desde Firestore:", error);
      setTodosLosBolsos(productosBolsos);
    }
  };

  useEffect(() => {
    cargarBolsos();
  }, []);

  const crearBolso = async () => {
    console.log("crearBolso ejecutado, usuario:", user?.email);
    if (!nuevoNombre || !nuevoPrecio || !nuevaUrlImagen) {
      alert("Por favor completa todos los campos y coloca la URL de la imagen");
      return;
    }

    try {
      // No se sube archivo, se usa directamente la URL proporcionada
      console.log("📝 Agregando documento a Firestore...");
      await addDoc(bolsosCollectionRef, {
        nombre: nuevoNombre,
        precio: nuevoPrecio,
        imagen: nuevaUrlImagen,
        disponible: nuevaDisponibilidad,
        id: Date.now().toString(),
        // Ya no hay rutaStorage porque no se usa Storage
      });

      alert("✅ Bolso creado correctamente");

      setNuevoNombre("");
      setNuevoPrecio("");
      setNuevaUrlImagen("");
      setNuevaDisponibilidad(true);
      setMostrarCrear(false);
      cargarBolsos();
    } catch (error) {
      console.error("🔥 Error creando bolso:", error.code, error.message);
      alert("❌ Error al crear el bolso: " + error.message);
    }
  };

  const editarBolso = async (idDoc, campo, valor) => {
    try {
      const bolsoDoc = doc(db, "Bolsos", idDoc);
      await updateDoc(bolsoDoc, { [campo]: valor });
      cargarBolsos();
    } catch (error) {
      console.error("Error editando bolso:", error);
    }
  };

  const eliminarBolso = async (idDoc) => {
    try {
      const bolsoDoc = doc(db, "Bolsos", idDoc);
      await deleteDoc(bolsoDoc);
      cargarBolsos();
    } catch (error) {
      console.error("Error eliminando bolso:", error);
    }
  };

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

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h2 className="text-3xl font-playfair text-center mb-10 text-pink-800 animate-aesthetic">
        Nuestra colección de bolsos
      </h2>

      {/* Botón del carrito */}
      <button
        onClick={() => setMostrarCarrito(true)}
        className="fixed top-6 right-6 bg-pink-600 text-white p-3 rounded-full shadow-lg z-50"
        title="Abrir carrito"
      >
        🛒 {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
      </button>

      {esAdmin && !mostrarCrear && (
        <button
          className="mb-6 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          onClick={() => setMostrarCrear(true)}
        >
          + Crear nuevo bolso
        </button>
      )}

      {mostrarCrear && (
        <div className="mb-6 p-4 bg-white rounded shadow max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">Nuevo bolso</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Precio"
            value={nuevoPrecio}
            onChange={(e) => setNuevoPrecio(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          {/* Cambiado a input de texto para URL */}
          <input
            type="text"
            placeholder="URL de la imagen"
            value={nuevaUrlImagen}
            onChange={(e) => setNuevaUrlImagen(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={nuevaDisponibilidad}
              onChange={() => setNuevaDisponibilidad(!nuevaDisponibilidad)}
              className="mr-2"
            />
            Disponible
          </label>
          <div className="flex justify-between">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={crearBolso}
            >
              Guardar
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setMostrarCrear(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {todosLosBolsos.map((producto) => {
          const esBolsoRemoto = bolsosRemotos.some(
            (b) => b.idDoc === producto.idDoc
          );
          return (
            <ProductCard
              key={producto.id}
              producto={producto}
              onClick={setImagenAmpliada}
              onAgregar={() => agregarAlCarrito(producto)}
              esAdmin={esAdmin && esBolsoRemoto}
              onEditar={(campo, valor) =>
                editarBolso(producto.idDoc, campo, valor)
              }
              onEliminar={() => eliminarBolso(producto.idDoc)}
            />
          );
        })}
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