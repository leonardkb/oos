import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Production Lines", path: "/production" },
  { label: "Finished Warehouse", path: "/finished-warehouse" },
  { label: "Fabric Relaxation", path: "/fabric-relaxation" },
  { label: "Cutting & Spreading", path: "/cutting-spreading" },
  
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const closeOnMobile = () => setSidebarOpen(false);

  return (
    <>
      {/* Overlay (mobile/tablet) */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
  className={`
    z-50
    w-64
    bg-slate-900 text-white
    shadow-xl
    h-screen
    flex-shrink-0

    fixed top-0 left-0 lg:sticky lg:top-0
    transform transition-transform duration-300 ease-out

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>

        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
            <h2 className="text-xl font-bold">AI-OOS</h2>

            <button
              className="lg:hidden text-white/80 hover:text-white"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeOnMobile}
                    className={({ isActive }) =>
                      `
                      w-full block
                      px-4 py-2.5 rounded-lg
                      text-sm font-medium
                      transition
                      ${
                        isActive
                          ? "bg-white/15 text-white ring-1 ring-white/10"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }
                    `
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer profile */}
          <div className="px-4 py-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/leo_12.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold">John Miller</p>
                <p className="text-xs text-white/60">Factory Owner</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
