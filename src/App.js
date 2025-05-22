import React, { useState, useEffect } from "react";
import { Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import Product from "./components/Product";
import Cart from "./components/CartProduct";
import InvoiceModal from "./components/InvoiceModal";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/Header";

function App() {
  // states
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // دریافت داده‌ها
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  // افزودن به سبد خرید
  const addToCart = (product) => {
    fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart((prev) => [...prev, data]);
        setToast({ show: true, message: "محصول به سبد خرید اضافه شد!" });
      });
  };

  // حذف از سبد خرید
  const removeFromCart = (id) => {
    fetch(`http://localhost:3001/cart/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      setToast({ show: true, message: "محصول از سبد خرید حذف شد!" });
    });
  };

  // فیلتر محصولات بر اساس جستجو
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // بستن Toast بعد از چند ثانیه
  const handleToastClose = () => setToast({ ...toast, show: false });

  // حذف همه آیتم‌ها از سبد خرید روی سرور و کلاینت
  const clearCart = () => {
    Promise.all(
      cart.map((item) =>
        fetch(`http://localhost:3001/cart/${item.id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => setCart([]))
      .catch((err) => console.error("خطا در پاکسازی سبد خرید:", err));
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Header />

      {/* دکمه گرد دارک/لایت مد */}
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

      <Container>
        <Row className="mb-3">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="جستجوی محصول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Product products={filteredProducts} onAddToCart={addToCart} />
          </Col>
          <Col md={4}>
            <Cart
              cartItems={cart}
              onRemoveFromCart={removeFromCart}
              onCheckout={() => setShowInvoiceModal(true)}
            />
          </Col>
        </Row>
      </Container>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={handleToastClose}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal فاکتور */}
      <InvoiceModal
        show={showInvoiceModal}
        handleClose={() => setShowInvoiceModal(false)}
        cartItems={cart}
        onPaymentSuccess={clearCart}
      />
      <Footer />
    </div>
  );
}

export default App;