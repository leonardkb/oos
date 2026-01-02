export default function AlertCard({
  text,
  type = "warning", // "warning" | "danger" | "info"
  time = "Just now",
}) {
  const styles = {
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      accent: "bg-amber-500",
      icon: "⚠️",
    },
    danger: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      accent: "bg-red-500",
      icon: "⛔",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      accent: "bg-blue-500",
      icon: "ℹ️",
    },
  };

  const current = styles[type];

  return (
    <div
      className={`
    min-w-[280px] lg:min-w-[340px]
    group relative flex items-start gap-3
    rounded-xl border ${current.border}
    ${current.bg}
    p-4 shadow-sm hover:shadow-md
    transition-all duration-200
  `}
    >
      {/* Left accent bar */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${current.accent}`}
      />

      {/* Icon */}
      <div
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-lg bg-white shadow
          ${current.text}
        `}
      >
        {current.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className={`text-sm font-medium ${current.text}`}>
          {text}
        </p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>

      {/* Action (optional future use) */}
      <button
        className="
          opacity-0 group-hover:opacity-100
          text-xs text-gray-400 hover:text-gray-700
          transition
        "
      >
        View
      </button>
    </div>
  );
}
