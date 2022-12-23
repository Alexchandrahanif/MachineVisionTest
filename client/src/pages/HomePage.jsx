import { useEffect, useState } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getAllUserLikes,
  likePost,
  selectPosts,
  selectUserLike,
  unlikePost,
} from "../store/splice/post";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { Typography } from "@mui/material";

function HomePage() {
  const dispatch = useDispatch();
  const { data, pagination } = useSelector(selectPosts);
  const [page, setPage] = useState(1);
  const likes = useSelector(selectUserLike);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllPosts(page));
    dispatch(getAllUserLikes());
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllPosts(null, search));
  };

  const handleLike = (id) => {
    dispatch(likePost(id, page));
  };

  const handleUnlike = (id) => {
    dispatch(unlikePost(id, page));
  };

  let active = page;
  let number;
  let items = [];
  for (number = 1; number <= pagination?.page; number++) {
    items.push(number);
  }

  return (
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
              key={value.id}
              className="col-3"
              style={{
                paddingTop: "12px",
                display: "flex",
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
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "14px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      {likes.includes(value.id) ? (
                        <HiHeart onClick={() => handleUnlike(value.id)} />
                      ) : (
                        <HiOutlineHeart onClick={() => handleLike(value.id)} />
                      )}
                    </Typography>
                    <Typography style={{ fontSize: "14px", color: "#424242" }}>
                      {value.likes} likes
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {value.User.username}
                  </Typography>
                  <Typography style={{ fontSize: "12px", color: "#757575" }}>
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
              fontSize: "50px",
            }}
          >
            <RiErrorWarningLine style={{ fontSize: "100px", color: "gray" }} />
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
  );
}
export default HomePage;
