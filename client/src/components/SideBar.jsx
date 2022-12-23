import axios from "axios";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SideBar() {
  const navigate = useNavigate();

  const logOut = async () => {
    const { data } = await axios({
      method: "POST",
      url: "http://localhost:3000/auth/logout",
    });
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#77aa9c",
      cancelButtonColor: "#08415c",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("You have been logged out!");
        navigate(`/login`);
      }
    });
  };

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block sidebar collapse"
      style={{
        backgroundColor: "#F2E7D5",
        minHeight: "100vh",
        position: "fixed",
      }}
    >
      <div className="position-sticky pt-1 sidebar-sticky">
        <ul className="nav flex-column d-flex justify-content-start ">
          <li className="nav-item d-flex justify-content-start">
            <Nav.Link
              onClick={() => navigate(`/`)}
              className="nav-link text-black small p-1 mb-1"
            >
              Home
            </Nav.Link>
          </li>
          <li className="nav-item d-flex justify-content-start">
            <Nav.Link
              onClick={() => navigate(`/user`)}
              className="nav-link text-black small p-1 mb-1"
            >
              User
            </Nav.Link>
          </li>
          <li className="nav-item d-flex justify-content-start">
            <Nav.Link
              onClick={() => navigate(`/change`)}
              className="nav-link text-black small p-1 mb-1"
            >
              Change Password
            </Nav.Link>
          </li>
          <li className="nav-item d-flex justify-content-start">
            <Nav.Link
              onClick={() => navigate(`/post`)}
              className="nav-link text-black small p-1 mb-1"
            >
              Post
            </Nav.Link>
          </li>
          <li className="nav-item d-flex justify-content-start">
            <Nav.Link
              onClick={() => logOut()}
              className="nav-link text-black small p-1 mb-1"
              href="#login"
            >
              Logout
            </Nav.Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
