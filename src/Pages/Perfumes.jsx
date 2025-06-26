import { useState, useEffect } from "react";
import productosPerfumes from "../data/perfume";
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
import { useAuth } from "../context/AuthContext";

export default function Perfumes() {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { carrito, setCarrito } = useCarrito();
  const [todosLosPerfumes, setTodosLosPerfumes] = useState([]);
  const [perfumesRemotos, setPerfumesRemotos] = useState([]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevasNotas, setNuevasNotas] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaUrlImagen, setNuevaUrlImagen] = useState("");
  const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState(true);

  const { user } = useAuth();
  const esAdmin = user?.uid === "rBeSA9cQ15f9lSjEfzBnZKUMDmz1";

  const perfumesCollectionRef = collection(db, "Perfumes");

  const cargarPerfumes = async () => {
    try {
      const snapshot = await getDocs(perfumesCollectionRef);
      const dataRemota = snapshot.docs.map((doc) => ({
        idDoc: doc.id,
        ...doc.data(),
      }));
      setPerfumesRemotos(dataRemota);

      const localesValidos = productosPerfumes.filter(
        (p) => p.nombre && p.precio && p.imagen
      );

      const combinados = [
        ...localesValidos,
        ...dataRemota.filter(
          (remoto) => !localesValidos.some((local) => local.id === remoto.id)
        ),
      ];
      setTodosLosPerfumes(combinados);
    } catch (error) {
      console.error("Error al cargar perfumes desde Firestore:", error);
    }
  };

  useEffect(() => {
    cargarPerfumes();
  }, []);

  const crearPerfume = async () => {
    if (!nuevoNombre || !nuevoPrecio || !nuevaUrlImagen || !nuevasNotas) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await addDoc(perfumesCollectionRef, {
        nombre: nuevoNombre,
        precio: nuevoPrecio,
        imagen: nuevaUrlImagen,
        disponible: nuevaDisponibilidad,
        notas: nuevasNotas,
        id: Date.now().toString(),
      });

      alert("✅ Perfume creado correctamente");
      setNuevoNombre("");
      setNuevoPrecio("");
      setNuevasNotas("");
      setNuevaUrlImagen("");
      setNuevaDisponibilidad(true);
      setMostrarCrear(false);
      cargarPerfumes();
    } catch (error) {
      console.error("Error creando perfume:", error);
      alert("Error al crear el perfume: " + error.message);
    }
  };

  const editarPerfume = async (idDoc, campo, valor) => {
    try {
      const perfumeDoc = doc(db, "Perfumes", idDoc);
      await updateDoc(perfumeDoc, { [campo]: valor });
      cargarPerfumes();
    } catch (error) {
      console.error("Error editando perfume:", error);
    }
  };

  const eliminarPerfume = async (idDoc) => {
    try {
      const perfumeDoc = doc(db, "Perfumes", idDoc);
      await deleteDoc(perfumeDoc);
      cargarPerfumes();
    } catch (error) {
      console.error("Error eliminando perfume:", error);
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
        Nuestra colección de perfumes
      </h2>

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
          + Crear nuevo perfume
        </button>
      )}

      {mostrarCrear && (
        <div className="mb-6 p-4 bg-white rounded shadow max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">Nuevo perfume</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Notas"
            value={nuevasNotas}
            onChange={(e) => setNuevasNotas(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Precio"
            value={nuevoPrecio}
            onChange={(e) => setNuevoPrecio(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
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
              onClick={crearPerfume}
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
        {todosLosPerfumes.map((producto) => {
          const esRemoto = perfumesRemotos.some((p) => p.idDoc === producto.idDoc);
          return (
            <ProductCard
              key={producto.id}
              producto={producto}
              onClick={setImagenAmpliada}
              onAgregar={() => agregarAlCarrito(producto)}
              esAdmin={esAdmin && esRemoto}
              onEditar={(campo, valor) => editarPerfume(producto.idDoc, campo, valor)}
              onEliminar={() => eliminarPerfume(producto.idDoc)}
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