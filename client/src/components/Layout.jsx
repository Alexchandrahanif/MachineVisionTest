import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <>
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          <SideBar />
          <div
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{
              minHeight: "100vh",
              backgroundColor: "#FAF8F1",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
