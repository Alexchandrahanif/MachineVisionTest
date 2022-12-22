import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";
import { HiPhoto } from "react-icons/hi2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewPost } from "../store/splice/post";

function ModalPost({ open, setOpen }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  // initialisasi
  const [newPost, setNewPost] = useState({
    image: "",
    caption: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setNewPost({ ...newPost, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
      // formData.append("photo", files[0]);
    } else setNewPost({ ...newPost, [name]: value });
  };

  const handleClose = () => {
    setNewPost({
      image: "",
      caption: "",
      tags: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("caption", newPost.caption);
    formData.append("image", newPost.image);
    formData.append("tags", newPost.tags);
    dispatch(createNewPost(formData));
    setOpen(false);
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className="bg-white flex-d col-4 p-4 border rounded"
          style={{
            transform: "translate(-50%, -50%)",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <div className="text-center">Form Add</div>
          <div className="d-flex justify-content-center p-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ width: "100px", height: "100px" }}>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Caption"
                  name="caption"
                  value={newPost.caption}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  placeholder="Tags"
                  name="tags"
                  value={newPost.tags}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="secondary"
                className="ms-3"
                onClick={() => setOpen(false)}
              >
                close
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPost;
