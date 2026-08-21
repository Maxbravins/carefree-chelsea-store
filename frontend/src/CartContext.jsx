import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];

    });

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart]);

    // Add Product

    function addToCart(product) {

        setCart((prevCart) => {

            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {

                return prevCart.map((item) =>

                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item

                );

            }

            return [

                ...prevCart,

                {
                    ...product,
                    quantity: 1,
                },

            ];

        });

    }

    // Remove Product

    function removeFromCart(id) {

        setCart((prevCart) =>

            prevCart.filter((item) => item.id !== id)

        );

    }

    // Increase Quantity

    function increaseQuantity(id) {

        setCart((prevCart) =>

            prevCart.map((item) =>

                item.id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item

            )

        );

    }

    // Decrease Quantity

    function decreaseQuantity(id) {

        setCart((prevCart) =>

            prevCart.map((item) =>

                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max(1, item.quantity - 1),
                      }
                    : item

            )

        );

    }

    // Clear Cart

    function clearCart() {

        setCart([]);

    }

    // Totals

    const totalItems = cart.reduce(

        (sum, item) => sum + item.quantity,

        0

    );

    const totalPrice = cart.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );

    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                totalItems,

                totalPrice,

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}