import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Video,
  Radio,
  X,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { AuthContext } from "./App"; // Import context

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function

  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Extract dynamic name from email (e.g., "banu@nexus.io" -> "BANU")
    const extractedName = formData.email.split("@")[0].toUpperCase();

    // Update Global State
    login({
      name: extractedName || "PILOT",
      email: formData.email,
    });

    setIsSuccessOpen(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0E1A] text-white flex flex-col relative overflow-hidden font-sans">
      {/* SUCCESS POPUP */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-sm bg-[#0D1223] border border-[#00F0FF]/50 rounded-[2rem] p-10 text-center animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-[#00F0FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#00F0FF] animate-bounce">
              <CheckCircle2 className="text-[#00F0FF]" size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">Access Granted</h2>
            <p className="text-gray-400 text-sm">
              Nexus connection established for {formData.email.split("@")[0]}
            </p>
          </div>
        </div>
      )}

      {/* Background Grids & Blobs omitted for brevity, keep your original ones */}

      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <Video size={20} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">NEXUS</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-[450px] bg-[#0D1223]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
              Re-establish Connection
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF]"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0E1A] border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm focus:border-[#00F0FF]/50 outline-none transition-all"
                  placeholder="pilot@nexus.io"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Security Key
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF]"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0E1A] border border-white/5 rounded-xl pl-12 pr-12 py-4 text-sm focus:border-[#00F0FF]/50 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Authorize Login <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
