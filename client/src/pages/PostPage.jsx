import { useState } from "react";
import Modal from "../components/AddModal";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { RiErrorWarningLine, RiEdit2Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import EditModal from "../components/EditModal";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getAllMyPosts, selectMyPosts } from "../store/splice/post";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";

function PostPage() {
  const [input, setInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState([]);
  const dispatch = useDispatch();
  const { data, pagination } = useSelector(selectMyPosts);
  const [page, setPage] = useState(1);
  const [postId, setPostId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllMyPosts(page));
  }, [page]);

  const handleEdit = (id) => {
    setOpen(true);
    setPostId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllMyPosts(null, search));
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't deleted this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deletePost(id, page));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let active = page;
  let number;
  let items = [];
  for (number = 1; number <= pagination?.page; number++) {
    items.push(number);
  }
  return (
    <div>
      <EditModal open={open} setOpen={setOpen} postId={postId} page={page} />
      <div>
        <div style={{ margin: "10px" }}>
          {/* serch section */}
          <div className="d-flex justify-content-start mt-3 mb-3 ms-2">
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </Form>
          </div>
          {/* card section */}
          <div className="row justify-content-between">
            {data && data.length ? (
              data.map((value) => (
                <div
                  style={{
                    display: "flex",
                    paddingTop: "12px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "205px",
                    height: "300px",
                    margin: "20px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={value.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "70%",
                    }}
                  />
                  <div
                    style={{
                      lineHeight: "normal",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      height: "30%",
                      padding: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          fontSize: "18px",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          onClick={() => setLike([...like, value.id])}
                          style={{ fontSize: "16px", cursor: "pointer" }}
                        >
                          {like.includes(value.id) ? (
                            <HiHeart />
                          ) : (
                            <HiOutlineHeart />
                          )}
                        </Typography>
                        <Typography>{value.likes}</Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <RiEdit2Line
                          onClick={() => handleEdit(value.id)}
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                        <FaTrash
                          onClick={() => handleDelete(value.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <div>
                      <Typography
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        {value.User.username}
                      </Typography>
                      <Typography style={{ fontSize: "12px" }}>
                        {value.caption}
                      </Typography>
                    </div>
                    <div style={{ display: "flex", color: "blueviolet" }}>
                      <Typography style={{ fontSize: "14px" }}>
                        {" "}
                        {value.tags}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "450px",
                  color: "red",
                  fontSize: "70px",
                }}
              >
                <RiErrorWarningLine
                  style={{ fontSize: "100px", color: "gray" }}
                />
                <p>No data available</p>
              </div>
            )}
          </div>
          {data ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                {items.map((value) => (
                  <Pagination.Item
                    key={value}
                    active={value === active}
                    onClick={() => setPage(value)}
                  >
                    {value}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="d-flex justify-content-end"
        style={{ position: "fixed", bottom: "20px", right: "30px" }}
      >
        <div>
          <Button onClick={() => setInput(true)} variant="outline-primary">
            +
          </Button>
          <Modal open={input} setOpen={setInput} page={page} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
