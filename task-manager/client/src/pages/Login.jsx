import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://task-manager-app-dxuq.onrender.com/api/auth/login",
        form
      );

    //   localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", form.email); // simple for now
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };


  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-87.5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome Back 👋
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200">
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 font-medium hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;