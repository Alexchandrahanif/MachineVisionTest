import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, Form } from "react-bootstrap";

function ModalPost({ open, setOpen }) {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="bg-white flex-d justify-content-center col-4 p-4 border rounded">
          <div className="text-center">Form Edit</div>
          <div className="d-flex justify-content-center p-5">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Caption" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Tags" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPost;
