import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Asumo que tienes axios configurado así
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const { login } = useContext(AuthContext);
  const [credenciales, setCredenciales] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Petición para obtener el token del backend
      const response = await api.post("/usuario/login", credenciales);
      const token = response.data.token;

      // Guardar token y usuario en contexto
      login(token);

      // Decodificar para obtener roles
      const decoded = jwtDecode(token);
      const roles = decoded.rol.map(r => r.authority);

      // Redirigir según rol
      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 border rounded"
          value={credenciales.username}
          onChange={(e) => setCredenciales({ ...credenciales, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded"
          value={credenciales.password}
          onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
