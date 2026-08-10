import Sidebar from "./Sidebar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main-area">
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;