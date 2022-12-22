import { useState } from "react";
import Modal from "../components/AddModal";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { RiErrorWarningLine, RiEdit2Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import EditModal from "../components/EditModal";
import { useSelector, useDispatch } from "react-redux";
import { getAllMyPosts, selectMyPosts } from "../store/splice/post";

function PostPage() {
  const [input, setInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState([]);
  const dispatch = useDispatch();
  const { data, pagination } = useSelector(selectMyPosts);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllMyPosts(page));
  }, [page]);
  console.log(pagination);
  let active = page;
  let number;
  let items = [];
  for (number = 1; number <= pagination?.page; number++) {
    items.push(number);
  }
  return (
    <div>
      <EditModal open={open} setOpen={setOpen} />
      <div>
        <div style={{ margin: "30px" }}>
          {/* serch section */}
          <div className="d-flex justify-content-start mt-3 mb-3 ms-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form>
          </div>
          {/* card section */}
          <div className="row justify-content-between">
            {data ? (
              data.map((value) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "330px",
                    height: "480px",
                    margin: "20px",
                    borderRadius: "20px",
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
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
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
                        <p
                          onClick={() => setLike([...like, value.id])}
                          style={{ fontSize: "24px", cursor: "pointer" }}
                        >
                          {like.includes(value.id) ? (
                            <HiHeart />
                          ) : (
                            <HiOutlineHeart />
                          )}
                        </p>
                        <p>{value.likes}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "18px",
                        }}
                      >
                        <RiEdit2Line
                          onClick={() => setOpen(true)}
                          style={{ fontSize: "24px", cursor: "pointer" }}
                        />
                        <FaTrash style={{ cursor: "pointer" }} />
                      </div>
                    </div>
                    <div>
                      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {value.User.username}
                      </p>
                      <p>{value.caption}</p>
                    </div>
                    <div style={{ display: "flex", color: "blueviolet" }}>
                      <p>#{value.tags}</p>
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
                  height: "700px",
                  color: "red",
                  fontSize: "70px",
                }}
              >
                <RiErrorWarningLine
                  style={{ fontSize: "150px", color: "gray" }}
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
          <Modal open={input} setOpen={setInput} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
