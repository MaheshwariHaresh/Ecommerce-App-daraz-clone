import axios from "../components/Utils/AxiosConfig";
import { useAuth } from "./auth";
import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  const loadCartItems = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/cart/get-cart-items`
      );

      const validItems = data?.cart?.products.filter(
        (item) => item.product || []
      );
      setCart(validItems);
    } catch (error) {
      setCart([]);
      console.log("Cart Load Error", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      loadCartItems();
    } else {
      setCart([]);
    }
  }, [auth?.token]);
  return (
    <CartContext.Provider value={{ cart, setCart, loadCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
