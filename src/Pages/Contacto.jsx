import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import WhatsAppButton from "../Componets/WhatsAppButton"; 

export default function Contacto() {
  const [state, handleSubmit] = useForm("xjkryekv"); 

  if (state.succeeded) {
    return <p className="text-center text-green-600 font-semibold mt-6">¡Gracias por tu mensaje! Te responderemos pronto.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-pink-700">Contacto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block mb-1 font-medium">Nombre *</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Nombres y Apellidos "
            required
            className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <ValidationError prefix="Nombre" field="nombre" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Correo electrónico *</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Tu correo aqui!"
            required
            className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="asunto" className="block mb-1 font-medium">Asunto</label>
          <input
            id="asunto"
            type="text"
            name="asunto"
            placeholder="Consulta sobre productos"
            className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <ValidationError prefix="Asunto" field="asunto" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="mensaje" className="block mb-1 font-medium">Mensaje *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="Escribe aquí tu mensaje..."
            required
            className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>
          <ValidationError prefix="Mensaje" field="mensaje" errors={state.errors} />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="bg-pink-700 text-white px-6 py-2 rounded hover:bg-pink-800 transition"
        >
          Enviar
        </button>
      </form>
      <WhatsAppButton />
    </div>
  );
}
