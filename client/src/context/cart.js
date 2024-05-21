import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext(); //createContext thi --> AuthContext naam no, context banavyo ---> useNavigate hook ni jem j

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // reload kare to pn Cart-Item display thay te mate initial time e aa function joiye getItem()
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// CUSTOM HOOK
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
