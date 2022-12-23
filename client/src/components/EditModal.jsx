import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";
import { HiPhoto } from "react-icons/hi2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost, getPost } from "../store/splice/post";
import { useEffect } from "react";
import Loading from "./Loading";

function EditModal({ open, setOpen, postId, page }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  // initialisasi
  const [thePost, setThePost] = useState({
    image: "",
    caption: "",
    tags: "",
  });

  useEffect(() => {
    dispatch(getPost(postId)).then((hasil) => {
      setThePost({
        image: hasil.image,
        caption: hasil.caption,
        tags: hasil.tags,
      });
      setPreview(hasil.image);
    });
  }, [open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setThePost({ ...thePost, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else setThePost({ ...thePost, [name]: value });
  };

  const handleClose = () => {
    setThePost({
      image: "",
      caption: "",
      tags: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("caption", thePost.caption);
    formData.append("image", thePost.image);
    formData.append("tags", thePost.tags);
    dispatch(editPost(postId, formData, page));
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
          <div className="text-center">Form Edit</div>
          <div className="d-flex justify-content-center p-5">
            {thePost.image ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Caption"
                    name="caption"
                    value={thePost.caption}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={thePost.tags}
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
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditModal;
