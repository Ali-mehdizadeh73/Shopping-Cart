import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

function InvoiceModal({ show, handleClose, cartItems, onPaymentSuccess }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    const paymentData = {
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("خطا در پرداخت");
        return res.json();
      })
      .then(() => {
        alert("پرداخت با موفقیت انجام شد. ممنون از خرید شما!");
        handleClose();
        onPaymentSuccess();
      })
      .catch((err) => {
        alert("پرداخت موفق نبود، لطفا دوباره تلاش کنید.");
        console.error(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>فاکتور خرید</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>سبد خرید خالی است.</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th> {/* ستون ردیف */}
                  <th>نام محصول</th>
                  <th>قیمت</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td> {/* شماره ردیف */}
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5 className="text-end">مجموع: ${total}</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handlePayment} disabled={cartItems.length === 0}>
          پرداخت
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InvoiceModal;
