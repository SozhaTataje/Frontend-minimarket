import { useEffect, useState } from "react";
import ProductCard from "./../components/ProductCard";

const Products = () => {
  const [sucursales, setSucursales] = useState([]);
  const [sucursalId, setSucursalId] = useState("");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3600/sucursal/all?param=x")
      .then(res => res.json())
      .then(data => {
        setSucursales(data);
        if (data.length > 0) {
          setSucursalId(data[0].idsucursal.toString()); 
        }
      })
      .catch(err => {
        console.error("Error cargando sucursales:", err);
        setError("No se pudieron cargar las sucursales");
      });
  }, []);

  // Cargar productos cuando se elige una sucursal
  useEffect(() => {
    if (!sucursalId) {
      setProductos([]);
      return;
    }

    setCargando(true);
    setError(null);

    fetch(`http://localhost:3600/productosucursal/sucursal/${sucursalId}`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos");
      })
      .finally(() => setCargando(false));
  }, [sucursalId]);

  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Productos por Sucursal</h2>

      {/* Selector de sucursal */}
      <div className="mb-6 text-center">
        <select
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value)}
          className="border border-gray-300 rounded p-2 text-lg"
        >
          <option value="">-- Selecciona una sucursal --</option>
          {sucursales.map((s) => (
            <option key={s.idsucursal} value={s.idsucursal}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Mensajes de estado */}
      {error && <p className="text-center text-red-600">{error}</p>}
      {cargando && <p className="text-center text-purple-600">Cargando productos...</p>}
      {!cargando && productos.length === 0 && !error && sucursalId && (
        <p className="text-center text-gray-500">No hay productos para esta sucursal.</p>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((p) => (
          <ProductCard key={p.idProductoSucursal} productosucursal={p} />
        ))}
      </div>
    </section>
  );
};

export default Products;
