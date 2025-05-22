import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function Product({ products, onAddToCart }) {
  return (
    <div>
      <h4>محصولات</h4>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`/images/${product.image}`}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>قیمت: {product.price.toLocaleString()} تومان</Card.Text>
                <Button className="btn-navy" onClick={() => onAddToCart(product)}>
                  افزودن به سبد خرید
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Product;