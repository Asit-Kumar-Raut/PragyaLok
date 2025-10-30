import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Categories() {
  const categories = [
    { id: 1, title: "Burgers & Fast Food", restaurants: 21, image: "/burger.jpg" },
    { id: 2, title: "Salads", restaurants: 32, image: "/salad.jpg" },
    { id: 3, title: "Pasta & Casuals", restaurants: 4, image: "/pasta.jpg" },
    { id: 4, title: "Pizza", restaurants: 32, image: "/pizza.jpg" },
    { id: 5, title: "Breakfast", restaurants: 4, image: "/breakfast.jpg" },
    { id: 6, title: "Soups", restaurants: 32, image: "/soup.jpg" },
  ];

  return (
    <section id="popular-categories" className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h3>Order.uk Popular Categories</h3>
        </div>

        <Row className="g-4">
          {categories.map((cat) => (
            <Col key={cat.id} xs={12} sm={6} md={4} lg={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Img
                  variant="top"
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <Card.Text>
                    <small>{cat.restaurants} Restaurants</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Categories;
