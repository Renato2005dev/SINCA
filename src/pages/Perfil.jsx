import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiUser3Line,
  RiEdit2Line,
  RiLockPasswordLine,
  RiLogoutBoxRLine,
  RiCloseLine,
} from "react-icons/ri";

import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { AVATARES, getEmojiPorFoto } from "../avatares";

const Perfil = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    foto: "",
    fecha: "",
  });

  const [modal, setModal] = useState(null); // "editar" | "password" | "avatar" | null
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Campos edición de nombre
  const [nombreEditado, setNombreEditado] = useState("");

  // Campos cambio de contraseña
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({
          nombre: user.displayName || "Usuario SINCA",
          correo: user.email || "",
          foto: user.photoURL || "",
          fecha: user.metadata.creationTime || "",
        });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("No se pudo cerrar la sesión.");
    }
  };

  const cerrarModal = () => {
    setModal(null);
    setError("");
    setPasswordActual("");
    setPasswordNueva("");
    setPasswordConfirmar("");
  };

  const abrirEditar = () => {
    setNombreEditado(usuario.nombre);
    setModal("editar");
  };

  const guardarNombre = async () => {
    if (!nombreEditado.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      await updateProfile(auth.currentUser, { displayName: nombreEditado.trim() });
      setUsuario((prev) => ({ ...prev, nombre: nombreEditado.trim() }));
      cerrarModal();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el nombre.");
    } finally {
      setCargando(false);
    }
  };

  const guardarContrasena = async () => {
    if (passwordNueva.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (passwordNueva !== passwordConfirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const credencial = EmailAuthProvider.credential(usuario.correo, passwordActual);
      await reauthenticateWithCredential(auth.currentUser, credencial);
      await updatePassword(auth.currentUser, passwordNueva);
      cerrarModal();
      alert("Contraseña actualizada correctamente.");
    } catch (err) {
      console.error(err);
      setError("Contraseña actual incorrecta o error al actualizar.");
    } finally {
      setCargando(false);
    }
  };

  const guardarAvatar = async (emoji) => {
    setCargando(true);
    setError("");
    try {
      await updateProfile(auth.currentUser, { photoURL: `emoji:${emoji}` });
      setUsuario((prev) => ({ ...prev, foto: `emoji:${emoji}` }));
      cerrarModal();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el avatar.");
    } finally {
      setCargando(false);
    }
  };

  const emojiActual = getEmojiPorFoto(usuario.foto);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#343A40] flex flex-col font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-[#165c36] flex items-center gap-2 font-bold hover:underline"
        >
          <RiArrowLeftLine />
          Volver al Inicio
        </button>
      </header>

      {/* CONTENIDO */}
      <main className="flex justify-center items-center flex-1 px-5 py-10">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full max-w-2xl p-10">

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#165c36]">
              Mi Perfil
            </h1>

            <p className="text-gray-500 mt-2">
              Administra la información de tu cuenta.
            </p>
          </div>

          {/* FOTO */}
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-green-50 border-4 border-[#165c36] flex items-center justify-center">
              {emojiActual ? (
                <span className="text-7xl">{emojiActual}</span>
              ) : usuario.foto ? (
                <img
                  src={usuario.foto}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <RiUser3Line className="text-7xl text-[#165c36]" />
              )}
            </div>

            <button
              onClick={() => setModal("avatar")}
              className="mt-4 text-[#165c36] font-bold hover:underline"
            >
              Cambiar foto
            </button>
          </div>

          {/* DATOS */}
          <div className="mt-10 space-y-6">

            <div>
              <p className="text-gray-500 text-sm">
                Nombre completo
              </p>

              <h3 className="text-lg font-bold">
                {usuario.nombre}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Correo electrónico
              </p>

              <h3 className="text-lg font-bold">
                {usuario.correo}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Miembro desde
              </p>

              <h3 className="text-lg font-bold">
                {usuario.fecha
                  ? new Date(usuario.fecha).toLocaleDateString("es-PE")
                  : ""}
              </h3>
            </div>

          </div>

          {/* BOTONES */}
          <div className="mt-10 border-t border-gray-200 pt-8 space-y-4">

            <button
              onClick={abrirEditar}
              className="w-full bg-[#165c36] hover:bg-[#14452F] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition"
            >
              <RiEdit2Line />
              Editar información
            </button>

            <button
              onClick={() => setModal("password")}
              className="w-full border border-[#165c36] text-[#165c36] hover:bg-green-50 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition"
            >
              <RiLockPasswordLine />
              Cambiar contraseña
            </button>

            <button
              onClick={cerrarSesion}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition"
            >
              <RiLogoutBoxRLine />
              Cerrar sesión
            </button>

          </div>

        </div>
      </main>

      {/* MODAL: EDITAR NOMBRE */}
      {modal === "editar" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
            <button onClick={cerrarModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <RiCloseLine className="text-2xl" />
            </button>

            <h2 className="text-xl font-bold text-[#165c36] mb-6">Editar información</h2>

            <label className="text-sm text-gray-500">Nombre completo</label>
            <input
              type="text"
              value={nombreEditado}
              onChange={(e) => setNombreEditado(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 mb-2 focus:outline-none focus:border-[#165c36]"
            />

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <button
              onClick={guardarNombre}
              disabled={cargando}
              className="w-full bg-[#165c36] hover:bg-[#14452F] text-white py-3 rounded-xl font-bold mt-4 transition disabled:opacity-60"
            >
              {cargando ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}

      {/* MODAL: CAMBIAR CONTRASEÑA */}
      {modal === "password" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
            <button onClick={cerrarModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <RiCloseLine className="text-2xl" />
            </button>

            <h2 className="text-xl font-bold text-[#165c36] mb-6">Cambiar contraseña</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Contraseña actual</label>
                <input
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-[#165c36]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Nueva contraseña</label>
                <input
                  type="password"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-[#165c36]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-[#165c36]"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              onClick={guardarContrasena}
              disabled={cargando}
              className="w-full bg-[#165c36] hover:bg-[#14452F] text-white py-3 rounded-xl font-bold mt-5 transition disabled:opacity-60"
            >
              {cargando ? "Guardando..." : "Actualizar contraseña"}
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ELEGIR AVATAR */}
      {modal === "avatar" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 relative">
            <button onClick={cerrarModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <RiCloseLine className="text-2xl" />
            </button>

            <h2 className="text-xl font-bold text-[#165c36] mb-1">Elige tu avatar</h2>
            <p className="text-gray-500 text-sm mb-6">Selecciona un animal para tu foto de perfil.</p>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
              {AVATARES.map(({ emoji, bg }) => (
                <button
                  key={emoji}
                  onClick={() => guardarAvatar(emoji)}
                  disabled={cargando}
                  className={`aspect-square rounded-full ${bg} flex items-center justify-center text-4xl border-2 transition
                    ${emojiActual === emoji ? "border-[#165c36]" : "border-transparent hover:border-[#165c36]/40"}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;