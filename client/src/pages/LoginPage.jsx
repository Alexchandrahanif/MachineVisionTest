import { Button, Form, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const [input, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputLogin({
      ...input,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/auth/login",
        data: input,
      });
      localStorage.setItem("access_token", data.data.token);
      localStorage.setItem("userId", data.data.id);
      navigate("/home");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log in success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center "
      style={{
        // minHeight: "100vh",
        // backgroundColor: "white",
        borderColor: "black",
        backgroundColor: "#77AA9C",
      }}
    >
      <Container
        fluid
        className="justify-content-center align-items-center mt-2 border rounded shadow-lg mb-3 bg-white rounded"
        style={{
          backgroundColor: "white",
          transform: "scale(80%)",
          borderColor: "black",
        }}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="col-6 d-flex justify-content-center align-items-center">
            <Form onSubmit={handleOnSubmit} className="w-75 m-auto mt-5">
              <h1 className="text-center mb-4 text-black">Login</h1>
              <Row className="mb-3">
                <Form.Group controlId="formGridEmail">
                  <Form.Label className="text-black d-flex justify-content-start">
                    Email address
                  </Form.Label>
                  <Form.Control
                    value={input.email}
                    onChange={handleOnChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                  <Form.Label className="text-black form-label mt-3 d-flex justify-content-start">
                    Password
                  </Form.Label>
                  <Form.Control
                    value={input.password}
                    onChange={handleOnChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </Form.Group>
              </Row>
              <Button
                size="lg"
                type="submit"
                className="mt-3 rounded-pill btn"
                style={{ backgroundColor: "#77AA9C", color: "white" }}
              >
                Login
              </Button>
              <Row className="mt-3 text-center">
                <h6>Don’t have an account?</h6>
                <Link
                  to="/register"
                  className="nav-link"
                  style={{ color: "#77AA9C", fontWeight: "bold" }}
                >
                  Create account
                </Link>
              </Row>
            </Form>
          </Col>
          <Col
            className="col-5 d-flex justify-content-center align-items-center p-1"
            style={{ backgroundColor: "white", height: "700px" }}
          >
            <img
              className="d-flex justify-content-center align-items-center"
              style={{ maxWidth: "600px" }}
              src="https://pbs.twimg.com/profile_images/1276049846177169408/lKaTYJG0_400x400.jpg"
            ></img>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginPage;
