import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

         <Route path="/product/:slug" element={<Product />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

        </Routes>

      </main>

    </div>
  );
}