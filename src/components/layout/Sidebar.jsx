import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  BrainCircuit,
  ChartColumn,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";//<a href="/dashboard">Dashboard</a> bunu kullanmadık çünkü a etiketi sayfayı tamamen yeniden yükler react sıfırdan başlar
const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applicants",
    path: "/applicants",
    icon: Users,
  },
  {
    title: "AI Analysis",
    path: "/analysis",
    icon: BrainCircuit,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: ChartColumn,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>AI Recruiter</h2>
    <nav>
  <ul>
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <li key={item.path}>
         <NavLink
  to={item.path}
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <Icon size={20} />
  <span>{item.title}</span>
</NavLink>
        </li>
      );
    })}
  </ul>
</nav>
    </aside>
  );
}

export default Sidebar;