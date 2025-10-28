import { createContext, useState } from "react";

// Tạo Context
export const CartContext = createContext();

// Provider Component
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (product) => {
        setCartItems((prev) => {
            const exist = prev.find((item) => item.id === product.id);

            if (exist) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                return [
                    ...prev,
                    {
                        ...product,
                        price: product.price.regular,
                        qty: 1,
                    },
                ];
            }
        });
    };

    // Cập nhật số lượng
    const updateQty = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    // Xóa sản phẩm
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const value = {
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}