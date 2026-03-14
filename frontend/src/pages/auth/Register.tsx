import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/utils/thunk";
import { register } from "../../store/features/authSlice";

interface PasswordFeedback {
  is_strong: boolean;
  score: number;
  warning?: string;
  suggestions?: string[];
  message?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] =
    useState<PasswordFeedback | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear password feedback when user types
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordFeedback(null);
    }
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const getScoreColor = (score: number) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-emerald-500",
    ];
    return colors[score] || colors[0];
  };

  const getScoreLabel = (score: number) => {
    const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return labels[score] || "Very Weak";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setPasswordFeedback(null);

    try {
      await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();
      toast.success("Registration successful! Please login.");
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err: any) {
      // Check if it's a structured password feedback object
      if (err && typeof err === "object" && "is_strong" in err) {
        setPasswordFeedback(err as PasswordFeedback);
      } else {
        toast.error(
          typeof err === "string"
            ? err
            : "Failed to register. Please try again.",
        );
      }
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Create an account
        </h2>
        <p className="text-slate-600 text-sm">
          Join Cozy Convo and start chatting
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent transition-all shadow-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent transition-all shadow-sm"
              placeholder="you@domain.com"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent transition-all shadow-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent transition-all shadow-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Password Strength Feedback */}
        {passwordFeedback && !passwordFeedback.is_strong && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
            {/* Score Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">
                    {passwordFeedback.message}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {getScoreLabel(passwordFeedback.score)}
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i <= passwordFeedback.score
                        ? getScoreColor(passwordFeedback.score)
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Warning */}
            {passwordFeedback.warning && (
              <div className="flex items-start gap-2.5 bg-amber-50 rounded-lg px-3 py-2.5 border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-700">
                  {passwordFeedback.warning}
                </p>
              </div>
            )}

            {/* Suggestions */}
            {passwordFeedback.suggestions &&
              passwordFeedback.suggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Suggestions
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-6">
                    {passwordFeedback.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-600 list-disc marker:text-blue-400"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-crypto-primary hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-crypto-primary hover:text-emerald-600 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
