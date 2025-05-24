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
    const existe = prev.find((p) => p.idproducto === producto.idproducto);
    if (existe) {
      return prev.map((p) =>
        p.idproducto === producto.idproducto
          ? { ...p, cantidad: p.cantidad + producto.cantidad }  
          : p
      );
    }
    return [...prev, { ...producto }];  
  });
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
};
