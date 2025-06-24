import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";  // <-- ruta corregida
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cargandoDesdeFirebase, setCargandoDesdeFirebase] = useState(true);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        const local = localStorage.getItem("carrito");
        if (local) setCarrito(JSON.parse(local));
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

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (!cargandoDesdeFirebase) {
      guardarCarritoEnFirebase(carrito);
    }
  }, [carrito, cargandoDesdeFirebase]);

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}