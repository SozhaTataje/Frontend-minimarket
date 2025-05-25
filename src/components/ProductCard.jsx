import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const ProductCard = ({ productosucursal }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  if (
    !productosucursal ||
    typeof productosucursal !== "object" ||
    !productosucursal.producto ||
    !productosucursal.producto.nombre
  ) {
    return null;
  }

  const { producto, stock, idProductoSucursal } = productosucursal;
  const stockDisponible = stock ?? 0;

  const aumentar = () => setCantidad((c) => Math.min(c + 1, stockDisponible));
  const disminuir = () => setCantidad((c) => Math.max(c - 1, 1));

  const manejarAgregar = () => {
    if (cantidad > stockDisponible) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    agregarAlCarrito({
      idproducto: producto.idproducto,
      idProductoSucursal,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad,
      stock,
    });

    setCantidad(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col p-4 relative group overflow-hidden">
      {/* Badge */}
      {stockDisponible <= 1 ? (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        Agotado
        </span>
      ) : null}

      {/* Imagen */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-70 w-full  transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Nombre y descripción */}
      <h3 className="text-gray-900 font-semibold text-lg truncate mt-4">{producto.nombre}</h3>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>

      {/* Precio */}
      <p className="text-purple-700 font-bold text-2xl mt-3">S/ {producto.precio.toFixed(2)}</p>

      {/* Controles */}
      <div className="mt-auto pt-4 flex flex-col gap-3">
        {/* Control de cantidad */}
        <div className="flex items-center justify-center border rounded-xl overflow-hidden w-fit mx-auto shadow-sm">
          <button
            onClick={disminuir}
            className="px-3 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min={1}
            max={stockDisponible}
            value={cantidad}
            onChange={(e) => {
              const val = Math.max(1, Math.min(stockDisponible, Number(e.target.value)));
              setCantidad(val);
            }}
            className="w-12 text-center text-lg font-medium focus:outline-none"
          />
          <button
            onClick={aumentar}
            className="px-3 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Botón agregar */}
        <button
          onClick={manejarAgregar}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl px-5 py-2 font-semibold hover:bg-purple-700 transition"
        >
          <ShoppingCart size={18} />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
