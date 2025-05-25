import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../../api/axiosInstance";

const RegisterUserModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await api.post("/api/usuario/signup", form);
      alert("Usuario registrado exitosamente");
      onClose();
    } catch (error) {
      alert("Error al registrar usuario");
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="p-6 bg-white rounded shadow-lg max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Registrar Usuario</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Nombre" name="nombre" onChange={handleChange} />
      <input className="w-full mb-2 p-2 border" placeholder="Apellido" name="apellido" onChange={handleChange} />
      <input className="w-full mb-2 p-2 border" placeholder="Email" name="email" type="email" onChange={handleChange} />
      <input className="w-full mb-2 p-2 border" placeholder="Contraseña" name="password" type="password" onChange={handleChange} />
      <input className="w-full mb-2 p-2 border" placeholder="Teléfono" name="telefono" onChange={handleChange} />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Registrar</button>
    </Modal>
  );
};

export default RegisterUserModal;
