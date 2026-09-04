import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState(() => {

        const saved = localStorage.getItem("wishlist");

        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

    }, [wishlist]);

    function isInWishlist(id) {

        return wishlist.some((item) => item.id === id);

    }

    function toggleWishlist(product) {

        setWishlist((prev) => {

            const exists = prev.some((item) => item.id === product.id);

            if (exists) {

                return prev.filter((item) => item.id !== product.id);

            }

            return [...prev, product];

        });

    }

    function removeFromWishlist(id) {

        setWishlist((prev) => prev.filter((item) => item.id !== id));

    }

    const wishlistCount = wishlist.length;

    return (

        <WishlistContext.Provider

            value={{

                wishlist,

                toggleWishlist,

                removeFromWishlist,

                isInWishlist,

                wishlistCount,

            }}

        >

            {children}

        </WishlistContext.Provider>

    );

}

export function useWishlist() {

    return useContext(WishlistContext);

}