import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import UserProfile from "./UserProfile"; 

export default function Header({ user }) {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  return (
    <header className="bg-gradient-to-r from-pink-800/70 via-pink-700/70 to-white-800/70 backdrop-blur-sm p-4 text-white flex flex-col md:flex-row items-center justify-between">
      <nav className="flex flex-col md:flex-row justify-around items-center flex-1">
        <h1 className="text-4xl font-aesthetic text-white-200 drop-shadow-md tracking-wide">
          Todo Con Estilo
        </h1>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <li><NavLink to="/Inicio" className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}>Inicio</NavLink></li>
          <li><NavLink to="/Bolsos" className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}>Bolsos</NavLink></li>
          
          <li><NavLink to="/Perfumes" className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}>Perfumes</NavLink></li>
          <li><NavLink to="/Contacto" className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}>Contacto</NavLink></li>
        </ul>
      </nav>

      {user && <UserProfile user={user} onLogout={handleLogout} />}
    </header>
  );
}
