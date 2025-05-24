import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../../api/axiosInstance";

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    estado: true,
    idcategoria: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/producto/save", form);
      alert("Producto agregado correctamente.");
      onProductAdded();
      onClose();
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("Error al agregar producto");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="p-6 bg-white rounded shadow-lg max-w-md mx-auto mt-20"
    >
      <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
      <input
        className="w-full mb-2 p-2 border"
        placeholder="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Descripción"
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />
      <input
        className="w-full mb-2 p-2 border"
        placeholder="Precio"
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
      />
      <input
        className="w-full mb-2 p-2 border"
        placeholder="Imagen (URL)"
        name="imagen"
        value={form.imagen}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
      >
        Agregar
      </button>
    </Modal>
  );
};

export default AddProductModal;