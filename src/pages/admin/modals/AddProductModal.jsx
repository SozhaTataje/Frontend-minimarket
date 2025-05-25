import React, { useState} from "react";
import Modal from "react-modal";
import api from "../../../api/axiosInstance";

const AddProductModal = ({ isOpen, onClose, onProductAdded, idSucursal }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState("");
  const [estado, setEstado] = useState(true);
  const [idCategoria, setIdCategoria] = useState(1); // Ajusta según categoría default
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) Guardar producto
      const productRequest = {
        nombre,
        descripcion,
        precio,
        imagen,
        estado,
        idcategoria: idCategoria,
      };

      const resSave = await api.post("/producto/save", productRequest);
      alert(resSave.data); // "Producto guardado correctamente"

      // 2) Buscar producto creado (por nombre)
      const resAll = await api.get("/producto/all");
      const productoCreado = resAll.data.find(
        (p) => p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
      );

      if (!productoCreado) {
        alert("No se pudo obtener el ID del producto creado.");
        setLoading(false);
        return;
      }

      // 3) Crear ProductoSucursal
      const productoSucursalRequest = {
        producto: productoCreado.idproducto,
        sucursal: idSucursal, // Recibes esto como prop, debe ser la sucursal actual
        stock,
      };

      await api.post("/productosucursal/agregar", productoSucursalRequest);
      alert("Producto agregado a la sucursal correctamente.");

      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setPrecio(0);
      setImagen("");
      setEstado(true);
      setIdCategoria(1);
      setStock(0);

      onProductAdded(); // Para recargar productos en el padre
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>

        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Precio:
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Imagen (URL):
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Estado:
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value === "true")}
            className="border p-2 w-full"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </label>

        <label className="block mb-2">
          ID Categoría:
          <input
            type="number"
            value={idCategoria}
            onChange={(e) => setIdCategoria(parseInt(e.target.value))}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Stock inicial:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
            className="border p-2 w-full"
          />
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
