export default function Navbar({ onMenuClick, onChatClick }) {
  return (
    <header className="h-16 bg-blue-50 backdrop-blur border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          aria-label="Open sidebar"
        >
          <span className="text-xl">☰</span>
        </button>

        <div className="leading-tight">
          <h1 className="font-bold text-blue-900 text-base lg:text-lg">
            Operations Optimization System
          </h1>
          <p className="hidden sm:block text-xs text-gray-500">
            Apparel Factory Control Center
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification */}
        <button
          className="relative h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          aria-label="Notifications"
        >
          <span className="text-lg">🔔</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Chat toggle icon */}
        <button
          onClick={onChatClick}
          className="relative h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          aria-label="Open chat"
        >
          <span className="text-lg">💬</span>
          <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            4
          </span>
        </button>

        {/* Optional: Chat label button (desktop only) */}
        {/* <button
          onClick={onChatClick}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          <span>AI Chat</span>
          <span className="opacity-90">→</span>
        </button> */}

        {/* Profile */}
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition">
          <img
            src="/leo_12.jpg"
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
            alt="Profile"
          />
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-sm font-semibold text-gray-900">John Miller</p>
            <p className="text-xs text-gray-500">Factory Owner</p>
          </div>
          <span className="hidden sm:block text-gray-400">▾</span>
        </button>
      </div>
    </header>
  );
}
