import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Newsletter from "./components/home/Newsletter";

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-white">

            <Navbar />

            <main className="flex-1">

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/shop"
                        element={<Shop />}
                    />

                     <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                    <Route
                        path="/product/:slug"
                        element={<Product />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />
                    <Route
                        path="/success"
                        element={<OrderSuccess />}
                    />

                    <Route
                        path="/newsletter"
                        element={<Newsletter />}
                    />

                </Routes>

            </main>

            <Footer />

        </div>
    );
}

export default App;