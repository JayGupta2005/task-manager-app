import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://task-manager-app-dxuq.onrender.com/api/auth/signup",
        form
      );

      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-87.5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
            {error} — please login
          </div>
        )}

        <input
          placeholder="Name"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
          Signup
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;