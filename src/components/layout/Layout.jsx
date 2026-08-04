import "./Layout.css";//css i bağlama
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
//class nameleri eklendi 
function Layout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-area">
        <Header />

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;