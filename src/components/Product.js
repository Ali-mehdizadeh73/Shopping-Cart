import React from "react";
import { Card, Button } from "react-bootstrap";

function Product({ products, onAddToCart }) {
  return (
    <div>
      <h4>محصولات</h4>
      {products.map((product) => (
        <Card key={product.id}>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>قیمت: ${product.price}</Card.Text>
            <Button className="btn-navy" onClick={() => onAddToCart(product)}>
              افزودن به سبد خرید
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Product;
