import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../../api/axiosInstance";

const AddSucursalModal = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    lat: "",
    lon: "",
    codigo_propio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...form,
        lat: Number(form.lat),
        lon: Number(form.lon),
        codigo_propio: `${form.nombre.slice(0, 3)}_${form.ciudad.slice(0, 3)}`.toUpperCase(),
      };

      await api.post("/sucursal/save", dataToSend);
      alert("Sucursal agregada correctamente.");
      onAdded();
      onClose();
    } catch (error) {
      console.error("Error al guardar sucursal:", error);
      alert("Error al guardar sucursal.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="p-6 bg-white rounded shadow-lg max-w-md mx-auto mt-20"
    >
      <h2 className="text-xl font-bold mb-4">Agregar Sucursal</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        className="w-full mb-2 p-2 border"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        name="direccion"
        placeholder="Dirección"
        className="w-full mb-2 p-2 border"
        value={form.direccion}
        onChange={handleChange}
      />
      <input
        name="ciudad"
        placeholder="Ciudad"
        className="w-full mb-2 p-2 border"
        value={form.ciudad}
        onChange={handleChange}
      />
      <input
        name="lat"
        type="number"
        placeholder="Latitud"
        className="w-full mb-2 p-2 border"
        value={form.lat}
        onChange={handleChange}
      />
      <input
        name="lon"
        type="number"
        placeholder="Longitud"
        className="w-full mb-2 p-2 border"
        value={form.lon}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded mt-4">
        Guardar
      </button>
    </Modal>
  );
};

export default AddSucursalModal;
