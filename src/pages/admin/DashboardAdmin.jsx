import React, { useEffect, useState, useContext } from "react";
import api from "../../api/axiosInstance";
import { FiBox, FiClipboard, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DashboardAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProductos, resPedidos] = await Promise.all([
        api.get("/producto/all?param=x"),
        api.get("/pedido/all"),
      ]);
      setProductos(resProductos.data);
      setPedidos(resPedidos.data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); // Esto limpia el AuthContext y el localStorage
    navigate("/"); // Redirige al Home
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow"
        >
          <FiLogOut />
          Cerrar sesión
        </button>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="text-center text-gray-600">Cargando datos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard label="Productos" value={productos.length} icon={<FiBox size={40} className="text-purple-600" />} />
          <StatCard label="Pedidos" value={pedidos.length} icon={<FiClipboard size={40} className="text-purple-600" />} />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
    {icon}
    <div>
      <h4 className="text-gray-500">{label}</h4>
      <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
  </div>
);

export default DashboardAdmin;