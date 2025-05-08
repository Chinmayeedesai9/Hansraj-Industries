import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists. Please log in.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-900">Sign Up</h2>

      <form onSubmit={handleSignup} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Full Name <span className="text-red-500">*</span></span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </label>

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
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-blue-900"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        <label className="block relative">
          <span className="text-sm font-medium">Confirm Password <span className="text-red-500">*</span></span>
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-9 text-blue-900"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline hover:text-blue-800">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
