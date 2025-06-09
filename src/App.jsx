import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bolsos from "./Pages/Bolsos";
import Maletas from "./Pages/Maletas";
import Perfumes from "./Pages/Perfumes";
import Inicio from "./Pages/Incio";
import Header from "./Componets/Header";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Componets/Login";
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const splashText = "Todo Con Estilo";

  return (
    <>
      {/* Fondo animado siempre visible */}
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
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Bolsos" element={<Bolsos />} />
            <Route path="/Maletas" element={<Maletas />} />
            <Route path="/Perfumes" element={<Perfumes />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
