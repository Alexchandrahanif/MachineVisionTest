import { useState } from "react";
import Modal from "../components/modal";
import { Card, Button, Form, Pagination } from "react-bootstrap";

function PostPage() {
  const [input, setInput] = useState(false);

  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <div>
        <div>
          <div className="d-flex justify-content-start mt-3 mb-3 ms-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form>
          </div>
          <div className="d-flex justify-content-evenly ms-2">
            <Card style={{ width: "230px", height: "300px" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <p>189</p>
                <p>189</p>
                {/* <Card.Text>120</Card.Text>
            <Card.Text>username</Card.Text>
            <Card.Text>caption</Card.Text>
            <Card.Text>tags</Card.Text> */}
              </Card.Body>
            </Card>
            <Card style={{ width: "230px", height: "300px" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <p>189</p>
                <p>189</p>
                {/* <Card.Text>120</Card.Text>
            <Card.Text>username</Card.Text>
            <Card.Text>caption</Card.Text>
            <Card.Text>tags</Card.Text> */}
              </Card.Body>
            </Card>
            <Card style={{ width: "230px", height: "300px" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <p>189</p>
                <p>189</p>
                {/* <Card.Text>120</Card.Text>
            <Card.Text>username</Card.Text>
            <Card.Text>caption</Card.Text>
            <Card.Text>tags</Card.Text> */}
              </Card.Body>
            </Card>
            <Card style={{ width: "230px", height: "300px" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <p>189</p>
                <p>189</p>
                {/* <Card.Text>120</Card.Text>
            <Card.Text>username</Card.Text>
            <Card.Text>caption</Card.Text>
            <Card.Text>tags</Card.Text> */}
              </Card.Body>
            </Card>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <Button onClick={() => setInput(true)} variant="outline-primary">
            edit
          </Button>
          <Modal open={input} setOpen={setInput} />
        </div>
        <div>
          <Button onClick={() => setInput(true)} variant="outline-primary">
            +
          </Button>
          <Modal open={input} setOpen={setInput} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
