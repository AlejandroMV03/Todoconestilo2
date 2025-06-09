import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

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
          <li>
            <NavLink
              to="/Inicio"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Bolsos"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}
            >
              Bolsos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Maletas"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}
            >
              Maletas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Perfumes"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "text-white")}
            >
              Perfumes
            </NavLink>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="mt-4 md:mt-0 flex flex-col items-center">
          <img src={user.photoURL} alt="Foto de perfil" className="w-10 h-10 rounded-full" />
          <span className="text-sm mt-1">{user.displayName}</span>
          <button
            onClick={handleLogout}
            className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
