const menu = [
  "Dashboard",
  "Production Lines",
  "Finished Warehouse",
  "Fabric Relaxation",
  "Cutting & Spreading",
  "AI Chatbot",
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
          fixed lg:static z-50
          h-dvh lg:h-screen w-64
          bg-slate-900 text-white
          shadow-xl
          transform transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Container to control spacing */}
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
            <h2 className="text-xl font-bold">AI-OOS</h2>

            {/* Close button on mobile */}
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
                <li key={item}>
                  <button
                    className="
                      w-full text-left
                      px-4 py-2.5 rounded-lg
                      text-sm font-medium
                      text-white/90
                      hover:bg-white/10 hover:text-white
                      transition
                    "
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer profile (always at bottom, no overlap) */}
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
