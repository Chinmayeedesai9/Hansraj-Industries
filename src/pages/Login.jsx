import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="example@email.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Password <span className="text-red-500">*</span></span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 rounded"
        >
          Log In
        </button>

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
