import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({
  onFinish,
  duration = 3000,
  title = "AI-OOS",
  slogan = "Optimize operations. Improve efficiency. Deliver on time.",
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        animate={{ opacity: 1, clipPath: "circle(120% at 50% 50%)" }}
        exit={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="
          fixed inset-0 z-[9999] flex items-center justify-center
          bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
        "
      >
        {/* soft glows */}
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center px-6">
          {/* Logo Badge */}
          <motion.div
            className="
              w-20 h-20 rounded-2xl
              bg-white/5 border border-white/10
              flex items-center justify-center
              shadow-[0_20px_60px_rgba(37,99,235,0.25)]
            "
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <span className="text-white text-3xl font-extrabold tracking-wider">
              OOS
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mt-6 text-white text-3xl font-bold tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {title}
          </motion.h1>

          {/* Accent line */}
          <motion.div
            className="mt-4 h-1 w-16 bg-blue-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Slogan */}
          <motion.p
            className="mt-4 text-sm text-white/75 max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.6 }}
          >
            {slogan}
          </motion.p>

          {/* Loading dots */}
          <motion.div
            className="mt-7 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.4 }}
          >
            <span className="text-xs text-white/60">Loading</span>
            <div className="flex gap-1.5">
              <span className="dot" />
              <span className="dot dot2" />
              <span className="dot dot3" />
            </div>
          </motion.div>

          {/* Footer hint */}
          <motion.p
            className="mt-6 text-[11px] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.65, duration: 0.5 }}
          >
            Initializing dashboards & AI insights…
          </motion.p>

          {/* dot animation css */}
          <style>{`
            .dot {
              width: 6px;
              height: 6px;
              border-radius: 999px;
              background: rgba(255,255,255,0.65);
              animation: bounce 1s infinite;
            }
            .dot2 { animation-delay: 0.15s; opacity: 0.8; }
            .dot3 { animation-delay: 0.3s; opacity: 0.6; }

            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
          `}</style>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
