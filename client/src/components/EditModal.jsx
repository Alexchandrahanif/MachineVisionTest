import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";
import { HiPhoto } from "react-icons/hi2";

function EditModal({ open, setOpen }) {
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
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="file" />
              </Form.Group>
              <div style={{ width: "100px", height: "100px" }}>
                <HiPhoto style={{ width: "100%", height: "100%" }} />
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Caption" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Tags" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="secondary"
                type="submit"
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

export default EditModal;
