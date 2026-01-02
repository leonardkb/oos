import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../Components/SplashScreen";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123admin") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
      // clear error after a bit (optional)
      setTimeout(() => setError(""), 2500);
    }
  };

  // Animations
  const page = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const leftPanel = {
    hidden: { opacity: 0, scale: 0.98, x: -12 },
    show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const errorAnim = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  };

  const shake = {
    shake: {
      x: [0, -10, 10, -8, 8, -4, 4, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen
          duration={4500}
          onFinish={() => setShowSplash(false)}
          title="AI-OOS"
          slogan="Optimize operations. Improve efficiency. Deliver on time."
        />
      )}

      {/* Login Page */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            key="login"
            variants={page}
            initial="hidden"
            animate="show"
            exit="exit"
            className="min-h-screen flex bg-gray-100"
          >
            {/* LEFT: Branding */}
            <motion.div
              variants={leftPanel}
              initial="hidden"
              animate="show"
              className="
                hidden lg:flex w-1/2
                bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800
                text-white items-center justify-center p-10
                relative overflow-hidden
              "
            >
              {/* soft glow */}
              <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative max-w-md text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                  className="
                    mx-auto w-20 h-20 rounded-2xl bg-white/5 border border-white/10
                    flex items-center justify-center shadow-[0_20px_60px_rgba(37,99,235,0.25)]
                  "
                >
                  <span className="text-3xl font-extrabold tracking-wider">OOS</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.45 }}
                  className="text-3xl font-bold mt-6"
                >
                  AI Operations Optimization
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="text-sm text-white/70 mt-3"
                >
                  Monitor • Optimize • Deliver
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.45, duration: 0.45 }}
                  style={{ transformOrigin: "left" }}
                  className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500"
                />
              </div>
            </motion.div>

            {/* RIGHT: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
              <motion.div
                variants={card}
                initial="hidden"
                animate="show"
                className="
                  w-full max-w-sm bg-white rounded-2xl shadow-lg
                  border border-gray-100 p-6
                "
              >
                <motion.div variants={stagger} initial="hidden" animate="show">
                  <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900">
                    Welcome Back
                  </motion.h2>

                  <motion.p variants={item} className="text-sm text-gray-500 mt-1">
                    Login to AI Operations Optimization System
                  </motion.p>

                 <motion.form
  variants={error ? shake : stagger}
  initial="hidden"
  animate={error ? "shake" : "show"}
  onSubmit={handleSubmit}
  className="mt-6 space-y-4"
>

                    {/* Username */}
                    <motion.div variants={item}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="
                          w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={item}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="
                          w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                      />
                    </motion.div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          variants={errorAnim}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="
                            text-sm text-red-700 bg-red-50 border border-red-200
                            rounded-lg px-3 py-2
                          "
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Button */}
                    <motion.button
                      variants={item}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="
                        w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5
                        rounded-xl font-semibold transition shadow-sm
                      "
                    >
                      Login
                    </motion.button>
                  </motion.form>

                  <motion.p variants={item} className="text-xs text-gray-400 mt-6 text-center">
                    © 2025 AI-OOS. All rights reserved.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
