import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import AdminLayout from "../../layouts/AdminLayout";
import RegisterUserModal from "./modals/RegisterUserModal";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await api.get("api/usuario/all"); 
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      alert("Error al cargar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const confirm = window.confirm("¿Eliminar este usuario?");
    if (!confirm) return;
    try {
      await api.delete(`/usuario/delete/${id}`); 
      alert("Usuario eliminado correctamente.");
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario.");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">Usuarios</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FiPlus className="mr-2" /> Registrar Usuario
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando usuarios...</p>
      ) : (
        <table className="min-w-full table-auto bg-white shadow rounded-lg p-4">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u, idx) => (
                <tr key={u.id} className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.nombre}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">
                    <button
                      onClick={() => eliminarUsuario(u.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <RegisterUserModal isOpen={showModal} onClose={() => setShowModal(false)} onUserAdded={fetchUsuarios} />
    </AdminLayout>
  );
};

export default Usuarios;
