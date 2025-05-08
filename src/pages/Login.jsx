import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Error sending reset email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-900">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Email <span className="text-red-500">*</span></span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="example@email.com"
          />
        </label>

        <label className="block relative">
          <span className="text-sm font-medium">Password <span className="text-red-500">*</span></span>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-9 text-blue-900"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded"
        >
          Log In
        </button>

        <p className="text-sm mt-2 text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </p>

        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline hover:text-blue-800">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
