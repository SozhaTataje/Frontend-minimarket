import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { FiPlus, FiEdit } from "react-icons/fi";
import AddProductModal from "./modals/AddProductModal";
import EditProductModal from "./modals/EditProductModal";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Aquí debes asignar el ID de la sucursal actual que usarás
  // Por ejemplo, puede venir de un estado o contexto
  const idSucursalActual = 1;

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/producto/all", { params: { param: "x" } });
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (producto) => {
    setEditingProduct(producto);
    setShowEditModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Gestión de Productos</h1>
        <button
          onClick={() => setShowProductModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          <FiPlus className="text-lg" /> Nuevo Producto
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-4">
        {loading ? (
          <div className="text-center text-gray-600 py-10">Cargando productos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-purple-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((p, i) => (
                    <tr
                      key={p.idproducto}
                      className={`border-b hover:bg-purple-50 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-2">{p.idproducto}</td>
                      <td className="px-4 py-2">{p.nombre}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar Producto"
                        >
                          <FiEdit /> <span>Editar</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para agregar producto */}
      <AddProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onProductAdded={() => {
          fetchProductos(); // recarga lista primero
          setShowProductModal(false); // luego cierra modal
        }}
        idSucursal={idSucursalActual} // <-- Aquí pasamos la sucursal actual
      />

      {/* Modal para editar producto */}
      {editingProduct && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          producto={editingProduct}
          onProductUpdated={() => {
            fetchProductos();
            setShowEditModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Productos;
