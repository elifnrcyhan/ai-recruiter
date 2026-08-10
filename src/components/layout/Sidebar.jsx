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

import { NavLink } from "react-router-dom";

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
<aside className="sidebar flex flex-col">
        <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">
          AI Recruiter
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-link active flex items-center gap-3 rounded-md px-3 py-2"
                      : "sidebar-link flex items-center gap-3 rounded-md px-3 py-2"
                  }
                >
                  <Icon size={18} />

                  <span>
                    {item.title}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2"
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;