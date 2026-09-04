import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './CartContext.jsx'
import { WishlistProvider } from './WishlistContext.jsx'
import './index.css'
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{
                      duration: 3000,
                      style: {
                          borderRadius: "14px",
                          background: "#034694",
                          color: "#fff",
                      },
                  }}
              />
          <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)