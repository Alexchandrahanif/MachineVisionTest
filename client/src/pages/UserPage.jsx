import axios from "axios";
import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function UserPage() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    photo: "",
  });
  console.log(input);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "PATCH",
        url: `http://localhost:3000/user/change-password`,
        data: input,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      setInput({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Change Password Success!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops, something's wrong!",
        text: error,
      });
    }
  };
  return (
    <Container className="justify-content-center align-items-center">
      <Row className=" justify-content-center align-items-center">
        <div className="text-center mt-5">
          <h3>User Detail</h3>
        </div>
        <Col className="d-flex col-6 justify-content-center p-4">
          <div className="d-flex justify-content-center align-items-center p-2">
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="name"
                  value={input.name}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Name"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="username"
                  value={input.username}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Username"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="email"
                  value={input.email}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Email"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="photo"
                  value={input.photo}
                  onChange={handleOnChange}
                  type="file"
                  placeholder="photo"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <div className="d-flex justify-content-evenly">
                <Button variant="success" type="submit">
                  Edit
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
