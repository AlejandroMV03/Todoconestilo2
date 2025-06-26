import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bolsos from "./Pages/Bolsos";
import Maletas from "./Pages/Maletas";
import Perfumes from "./Pages/Perfumes";
import Inicio from "./Pages/Incio";
import Header from "./Componets/Header";
import Login from "./Componets/Login";
import Contacto from "./Pages/Contacto";
import './index.css';

import { useAuth } from "./context/AuthContext"; // 👈 importar el contexto

function App() {
  const { user, checkingAuth } = useAuth(); // 👈 usarlo aquí
  const splashText = "Todo Con Estilo";

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      {checkingAuth || !user ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-white">
          <div className="text-center text-5xl md:text-7xl font-playfair font-bold">
            {splashText.split("").map((char, index) => {
              const startX = `${(Math.random() - 0.5) * 200}%`;
              const startY = `${(Math.random() - 0.5) * 200}%`;

              return (
                <span
                  key={index}
                  className="animate-letter"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    '--start-x': startX,
                    '--start-y': startY,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
          <Login />
        </div>
      ) : (
        <BrowserRouter>
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Bolsos" element={<Bolsos />} />
            <Route path="/Maletas" element={<Maletas />} />
            <Route path="/Perfumes" element={<Perfumes />} />
            <Route path="/Contacto" element={<Contacto />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
