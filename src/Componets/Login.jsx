import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const handleLogin = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-800 transition-all"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
