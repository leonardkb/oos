export default function StatCard({
  title,
  value,
  unit = "",
  trend,
  subtitle = "vs yesterday",
  icon = null, // pass "📦" or any small icon
}) {
  const isPositive = typeof trend === "string" && trend.startsWith("+");
  const isNegative = typeof trend === "string" && trend.startsWith("-");
  const isWarning = trend === "⚠️";

  const badgeClass = isPositive
    ? "bg-green-50 text-green-700 ring-green-200"
    : isNegative
    ? "bg-red-50 text-red-700 ring-red-200"
    : "bg-amber-50 text-amber-700 ring-amber-200";

  const accentClass = isPositive
    ? "from-green-500 to-emerald-400"
    : isNegative
    ? "from-red-500 to-rose-400"
    : "from-amber-500 to-yellow-400";

  return (
    <div
      className="
        group relative bg-white rounded-2xl border border-gray-100
        shadow-sm hover:shadow-md transition-all duration-200
        hover:-translate-y-0.5
        overflow-hidden
      "
    >
      {/* Left Accent Bar */}
      <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${accentClass}`} />

      <div className="p-4 pl-5 flex items-center justify-between gap-4">
        {/* Left Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-lg leading-none">{icon}</span>
            )}
            <p className="text-sm font-semibold text-gray-800 truncate">
              {title}
            </p>
          </div>

          {/* subtle divider */}
          <div className="h-px bg-gray-100 my-3" />

          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              {value}
            </h3>
            {unit && (
              <span className="text-sm text-gray-500 pb-1">{unit}</span>
            )}
          </div>

          {/* subtitle */}
          <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
        </div>

        {/* Right Badge */}
        <div className="shrink-0 flex flex-col items-end gap-2">
          <span
            className={`
              inline-flex items-center gap-1
              px-3 py-1 rounded-xl text-sm font-semibold
              ring-1 ${badgeClass}
            `}
          >
            {isWarning ? "⚠️" : trend}
          </span>

          {/* tiny status dot (optional professional touch) */}
          <span
            className={`
              h-2 w-2 rounded-full
              ${isPositive ? "bg-green-500" : isNegative ? "bg-red-500" : "bg-amber-500"}
            `}
          />
        </div>
      </div>
    </div>
  );
}

