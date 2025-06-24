import React from "react";

export default function Carrito({ carrito, setCarrito, eliminarDelCarrito, onCerrar }) {
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const generarMensaje = () => {
    let mensaje = "Pedido:\n";
    carrito.forEach((item) => {
      mensaje += `- ${item.nombre} x${item.cantidad} - $${(
        item.precio * item.cantidad
      ).toFixed(2)} MXN\n`;
    });
    mensaje += `Total: $${total.toFixed(2)} MXN`;
    return encodeURIComponent(mensaje);
  };

  const enviarPedido = () => {
    const numero = "529811153639";
    const mensaje = generarMensaje();
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50"
      onClick={onCerrar} // 👉 Cerrar al tocar fuera
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // ❌ No cerrar al hacer clic dentro
      >
        <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="max-h-60 overflow-auto mb-4">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-3 border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.nombre}</p>
                    <p>${item.precio.toFixed(2)} MXN</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => disminuirCantidad(item.id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() => aumentarCantidad(item.id)}
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="text-red-600 text-xl hover:text-red-800"
                      title="Eliminar del carrito"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="font-bold mb-4 text-right">
              Total: ${total.toFixed(2)} MXN
            </p>

            <div className="flex justify-between">
              <button
                onClick={onCerrar}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
              <button
                onClick={enviarPedido}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Enviar pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
