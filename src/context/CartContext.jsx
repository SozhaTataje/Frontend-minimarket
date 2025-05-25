import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const stored = localStorage.getItem("carrito");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (p) => p.idProductoSucursal === producto.idProductoSucursal
      );
      if (existe) {
        const nuevaCantidad = existe.cantidad + producto.cantidad;
        if (nuevaCantidad > existe.stock) return prev;
        return prev.map((p) =>
          p.idProductoSucursal === producto.idProductoSucursal
            ? { ...p, cantidad: nuevaCantidad }
            : p
        );
      }
      return [...prev, { ...producto }];
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ carrito, setCarrito, agregarAlCarrito, vaciarCarrito, cantidadTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
