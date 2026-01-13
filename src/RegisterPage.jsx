import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Video,
  Radio,
  CheckCircle2, // Added for success popup
  XCircle, // Added for validation feedback
} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false); // Success state

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setPasswordStrength(score);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
    if (name === "password") checkStrength(val);
  };

  const getPasswordStrengthColor = () => {
    const colors = ["#FF4444", "#FFAA44", "#FFDD44", "#00F0FF"];
    return colors[passwordStrength - 1] || "#374151";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Security Keys do not match. Please re-verify.");
      return;
    }

    // Check if terms are agreed
    if (!formData.agreed) {
      alert("Please acknowledge the Privacy Protocol.");
      return;
    }

    // Trigger Success Popup
    setIsSuccessOpen(true);

    console.log("Account Created Successfully", formData);

    // Redirect after delay
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A0E1A] via-[#0D1223] to-[#0A0E1A] text-white flex flex-col relative overflow-hidden font-sans selection:bg-[#00F0FF]/30">
      {/* SUCCESS REGISTRATION MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-sm bg-[#0D1223] border border-[#00F0FF]/50 rounded-[2rem] p-10 shadow-[0_0_60px_rgba(0,240,255,0.2)] animate-in fade-in zoom-in duration-500 text-center">
            <div className="w-20 h-20 bg-[#00F0FF]/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#00F0FF] animate-pulse">
              <CheckCircle2 className="text-[#00F0FF]" size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2 tracking-tight">
              Account Initialized
            </h2>
            <p className="text-gray-400 text-sm">
              Your Nexus identity has been verified. <br />
              Welcome to the stream.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#7B68EE]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
              <div className="relative">
                <Video
                  size={20}
                  className="text-white z-10"
                  strokeWidth={2.5}
                />
                <Radio
                  size={14}
                  className="absolute -top-2 -right-2 text-white animate-pulse"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A0E1A] animate-ping"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A0E1A]"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#7B68EE]">
            NEXUS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <span className="text-gray-400">Already a member?</span>
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Log In{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-[500px] bg-[#0D1223]/80 backdrop-blur-2xl border border-[#00F0FF]/20 rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-white">
              Create Account
            </h1>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
              Access the Nexus Stream
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Username */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                Username
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nexus_User"
                  className="w-full bg-[#0A0E1A]/80 border border-white/5 text-gray-200 text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#00F0FF]/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="user@nexus.io"
                  className="w-full bg-[#0A0E1A]/80 border border-white/5 text-gray-200 text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#00F0FF]/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Password
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor:
                          passwordStrength >= i
                            ? getPasswordStrengthColor()
                            : "#1F2937",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0E1A]/80 border border-white/5 text-gray-200 text-sm rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#00F0FF]/50 transition-all"
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

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                Confirm Security Key
              </label>
              <div className="relative group">
                <ShieldCheck
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    formData.confirmPassword &&
                    formData.password === formData.confirmPassword
                      ? "text-[#00F0FF]"
                      : "text-gray-500"
                  }`}
                  size={16}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full bg-[#0A0E1A]/80 border text-gray-200 text-sm rounded-xl pl-12 pr-12 py-3.5 focus:outline-none transition-all ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "border-red-500/50"
                      : "border-white/5 focus:border-[#00F0FF]/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00F0FF]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-[9px] text-red-500 mt-1 ml-1 font-bold uppercase tracking-wider">
                    Keys do not match
                  </p>
                )}
            </div>

            {/* TERMS AND CONDITIONS */}
            <div className="flex items-start gap-3 py-2 px-1">
              <div className="relative flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreed"
                  required
                  checked={formData.agreed}
                  onChange={handleInputChange}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/10 bg-[#0A0E1A] transition-all checked:bg-[#00F0FF] checked:border-[#00F0FF]"
                />
                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity font-bold" />
              </div>
              <label
                htmlFor="terms"
                className="text-[11px] leading-tight text-gray-400 cursor-pointer select-none"
              >
                I agree to the{" "}
                <span className="text-[#00F0FF] hover:underline">
                  Terms of Service
                </span>{" "}
                and acknowledge the{" "}
                <span className="text-[#00F0FF] hover:underline">
                  Privacy Protocol
                </span>
                .
              </label>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group transform active:scale-95 shadow-[0_0_30px_rgba(0,240,255,0.3)] mt-2"
            >
              Initialize Account{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
        </div>
      </main>

      <footer className="w-full py-8 text-center z-20">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
          © 2026 NEXUS TECH •{" "}
          <span className="text-[#00F0FF] ml-2">
            SECURE • MODERN • INNOVATIVE
          </span>
        </p>
      </footer>
    </div>
  );
};

export default RegisterPage;
