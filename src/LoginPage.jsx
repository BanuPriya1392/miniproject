import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Video,
  Radio,
  CheckCircle2,
  RefreshCcw,
  X,
} from "lucide-react";
import { AuthContext } from "./App";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const extractedName = formData.email.split("@")[0].toUpperCase();

    login({
      name: extractedName || "PILOT",
      email: formData.email,
    });

    setIsSuccessOpen(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    setIsResetModalOpen(false);
    alert(`Security override link sent to: ${formData.email || "your email"}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A0E1A] via-[#0D1223] to-[#0A0E1A] text-white flex flex-col relative overflow-hidden font-sans selection:bg-[#00F0FF]/30">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#7B68EE]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* SUCCESS POPUP (ACCESS GRANTED) */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-sm bg-[#0D1223] border border-[#00F0FF]/50 rounded-[2rem] p-10 text-center animate-in fade-in zoom-in shadow-[0_0_60px_rgba(0,240,255,0.2)]">
            <div className="w-20 h-20 bg-[#00F0FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#00F0FF] animate-bounce">
              <CheckCircle2 className="text-[#00F0FF]" size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">Access Granted</h2>
            <p className="text-gray-400 text-sm">
              Nexus connection established.
            </p>
          </div>
        </div>
      )}

      {/* RESET KEY MODAL - UPDATED THEME */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsResetModalOpen(false)}
          />
          <div className="relative w-full max-w-[420px] bg-[#0D1223]/90 backdrop-blur-2xl border border-[#00F0FF]/20 rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(0,240,255,0.15)] animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#00F0FF]/30">
                <RefreshCcw className="text-[#00F0FF]" size={28} />
              </div>
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
                Security Reset
              </h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Initialize Decryption Sequence
              </p>
            </div>

            <form onSubmit={handleResetRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Verification Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                    size={16}
                  />
                  <input
                    type="email"
                    placeholder="nexus_pilot@stream.io"
                    className="w-full bg-[#0A0E1A] border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm focus:border-[#00F0FF]/50 outline-none transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>

              <button className="w-full h-14 bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] text-white font-black rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-wide uppercase text-xs">
                Send Reset Link <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-20">
        <div
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-11 h-11 bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center transition-all duration-500 group-hover:scale-110">
            <div className="relative">
              <Video size={20} className="text-white" strokeWidth={2.5} />
              <Radio
                size={14}
                className="absolute -top-2 -right-2 text-white"
              />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#7B68EE]">
            NEXUS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <span className="text-gray-400">New to the stream?</span>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]/50 transition-all"
          >
            <span className="flex items-center gap-2">
              Sign Up <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Login Card - UPDATED WITH REGISTER THEME */}
      <main className="flex-1 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-[450px] bg-[#0D1223]/80 backdrop-blur-2xl border border-[#00F0FF]/20 rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
              Re-establish Nexus Connection
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0E1A] border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm focus:border-[#00F0FF]/50 outline-none transition-all"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Security Key
                </label>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-widest hover:underline"
                >
                  Reset Key?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0E1A] border border-white/5 rounded-xl pl-12 pr-12 py-4 text-sm focus:border-[#00F0FF]/50 outline-none transition-all"
                  placeholder="Enter key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00F0FF]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-white/10 bg-[#0A0E1A] text-[#00F0FF]"
              />
              <label
                htmlFor="remember"
                className="text-[11px] text-gray-400 cursor-pointer select-none font-medium"
              >
                Maintain session persistence
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] text-white font-black py-4 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
            >
              Authorize Login <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </main>

      <footer className="w-full py-8 text-center z-20">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
          © 2026 NEXUS TECH •{" "}
          <span className="text-[#00F0FF] ml-2">DATA ENCRYPTION ENABLED</span>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
