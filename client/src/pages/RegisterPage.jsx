import { Button, Form, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [input, setInputRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  console.log(input, "<< input formnya");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      let img = e.target.files[0];
      setInputRegister({
        ...input,
        [name]: img,
      });
    } else {
      setInputRegister({
        ...input,
        [name]: value,
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", input.photo);
      formData.append("name", input.name);
      formData.append("username", input.username);
      formData.append("email", input.email);
      formData.append("password", input.password);
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/auth/register",
        data: formData,
      });
      setInputRegister({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
      navigate("/login");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register success!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops, something's wrong!",
        text: err,
      });
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center"
      style={{
        maxHeight: "100vh",
        backgroundColor: "#77aa9c",
      }}
    >
      <Container
        fluid
        className="justify-content-center align-items-center mt-2 border rounded shadow-lg bg-white rounded"
        style={{
          backgroundColor: "white",
          transform: "scale(85%)",
          borderColor: "black",
        }}
      >
        <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <Col className="col-4 d-flex justify-content-center align-items-center">
            <img
              className="d-flex justify-content-center align-items-center w-100 h-100 p-5"
              src="https://pbs.twimg.com/profile_images/1276049846177169408/lKaTYJG0_400x400.jpg"
            ></img>
          </Col>
          <Col className="col-6 d-flex justify-content-center align-items-center mb-5">
            <Form onSubmit={handleOnSubmit} className="w-75 m-auto">
              <Row className="d-flex justify-content-center align-items-center text-center">
                <h2>Register</h2>
              </Row>
              <Row>
                <Form.Group ontrolId="formGridUsername">
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
                <Form.Group controlId="formGridEmail">
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
                <Form.Group controlId="formGridPassword">
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
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Control
                    name="password"
                    value={input.password}
                    onChange={handleOnChange}
                    type="password"
                    placeholder="Password"
                    className="mb-3"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group controlId="formGridAddress">
                  <Form.Control
                    name="photo"
                    onChange={handleOnChange}
                    type="file"
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group>
                  <div>
                    {selectedImage && (
                      <div>
                        <img
                          alt="not fount"
                          width={"150px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Row>
              <Col className="d-flex justify-content-center align-items-center">
                <Button
                  onClick={() => navigate(`/login`)}
                  variant="light"
                  type="button"
                  className="mt-3 margin-5 btn btn-light mx-2 btn-outline-secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 border-0 btn btn-outline-black btn-outline-secondary"
                  style={{ backgroundColor: "#77AA9C", color: "white" }}
                >
                  Register
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default RegisterPage;
