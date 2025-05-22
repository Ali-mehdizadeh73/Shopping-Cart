import React from "react";
import { Card, Button } from "react-bootstrap";

function Cart({ cartItems, onRemoveFromCart, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h4>سبد خرید</h4>
      {cartItems.length === 0 ? (
        <p>سبد خرید خالی است</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-2">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  {item.name} - ${item.price}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  حذف
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Card className="mt-3">
            <Card.Body>
              <strong>مجموع کل: ${total}</strong>
            </Card.Body>
          </Card>
          <Button
            variant="primary"
            className="mt-3 w-100"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
          >
            نهایی کردن خرید
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
