import axios from "axios";
import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function ChangePasswordPage() {
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
        title: error.response.data.message,
      });
    }
  };
  return (
    <Container className="justify-content-center align-items-center">
      <Row className=" justify-content-center align-items-center">
        <div className="text-center mt-5">
          <h3>Change Password</h3>
        </div>
        <Col className="d-flex col-6 justify-content-center p-4">
          <div className="d-flex justify-content-center align-items-center p-2">
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="oldPassword"
                  value={input.oldPassword}
                  onChange={handleOnChange}
                  type="password"
                  placeholder="Old Password"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="newPassword"
                  value={input.newPassword}
                  onChange={handleOnChange}
                  type="password"
                  placeholder="New Password"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="confirmNewPassword"
                  value={input.confirmNewPassword}
                  onChange={handleOnChange}
                  type="password"
                  placeholder="Confirm New Password"
                  className="mb-3"
                  autoComplete="off"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePasswordPage;
