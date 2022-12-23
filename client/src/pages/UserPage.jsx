import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { HiPhoto } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { editUser, getUser, selectUser } from "../store/splice/user";

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    photo: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getUser()).then((value) => {
      console.log(value, "user");
      setInput({
        name: value.name,
        username: value.username,
        email: value.email,
        photo: value.photo,
      });
      setPreview(value.photo);
    });
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setInput({ ...input, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", input.name);
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("photo", input.photo);
    dispatch(editUser(formData));
  };

  return (
    <Container className="justify-content-center align-items-center">
      <Row className=" justify-content-center align-items-center">
        <div className="text-center mt-5">
          <h3>User Detail</h3>
        </div>
        <Col className="d-flex col-6 justify-content-center p-4">
          <div className="d-flex justify-content-center align-items-center p-2">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                  className="mb-3"
                  autoComplete="off"
                  style={{
                    pointerEvents: isEdit ? "" : "none",
                    backgroundColor: isEdit ? "" : "#eceff1",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  className="mb-3"
                  autoComplete="off"
                  style={{
                    pointerEvents: isEdit ? "" : "none",
                    backgroundColor: isEdit ? "" : "#eceff1",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  className="mb-3"
                  autoComplete="off"
                  style={{
                    pointerEvents: isEdit ? "" : "none",
                    backgroundColor: isEdit ? "" : "#eceff1",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="photo"
                  onChange={handleChange}
                  type="file"
                  placeholder="photo"
                  className="mb-3"
                  autoComplete="off"
                  style={{
                    pointerEvents: isEdit ? "" : "none",
                    backgroundColor: isEdit ? "" : "#eceff1",
                  }}
                />
              </Form.Group>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "15px",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <HiPhoto style={{ width: "100%", height: "100%" }} />
                )}
              </div>
              <div className="d-flex justify-content-evenly">
                {isEdit ? (
                  <Button variant="secondary" onClick={() => setIsEdit(false)}>
                    cancel
                  </Button>
                ) : (
                  <Button variant="success" onClick={() => setIsEdit(true)}>
                    Edit
                  </Button>
                )}
                {isEdit ? (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button variant="secondary" type="submit" disabled>
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
