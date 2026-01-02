export default function Chatbot({ chatOpen, setChatOpen }) {
  return (
    <>
      {/* Chat Panel */}
      <div
        className={`
          fixed bottom-24 right-6 z-50 w-80
          bg-white rounded-xl shadow-2xl overflow-hidden
          transform transition-all duration-300
          ${chatOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <h3 className="font-semibold">AI Operations Assistant</h3>
          <button
            onClick={() => setChatOpen(false)}
            className="text-white/90 hover:text-white"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-sm h-40 overflow-y-auto space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">User:</span> What’s the status of PO-2345?
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700">
            <span className="font-semibold">AI:</span> Order PO-2345 is 65% ready and at high risk due to finishing delays.
          </div>
        </div>

        <div className="border-t p-3">
          <div className="flex gap-2">
            <input
              placeholder="Ask me anything..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700 transition">
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Floating Circle Button */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className="
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-blue-600 text-white
          shadow-xl hover:bg-blue-700
          flex items-center justify-center
          transition
        "
        aria-label="Open chat"
      >
        {chatOpen ? "✕" : "💬"}
      </button>
    </>
  );
}
