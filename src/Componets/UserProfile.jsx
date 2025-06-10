export default function UserProfile({ user, onLogout }) {
  return (
    <div className="mt-4 md:mt-0 flex flex-col items-center">
      <img src={user.photoURL} alt="Foto de perfil" className="w-10 h-10 rounded-full" />
      <span className="text-sm mt-1">{user.displayName}</span>
      <button
        onClick={onLogout}
        className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
      >
        Cerrar sesión
      </button>
    </div>
  );
}