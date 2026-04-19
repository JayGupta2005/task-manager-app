import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const updateTask = async (id) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title: editText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditId(null);
    setEditText("");
    fetchTasks();
  };

  // ✅ Toggle Complete
  const toggleComplete = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-gray-800">
              Task Manager
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">
              👤 {user}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Count */}
        <p className="mb-4 text-gray-600">
          Total Tasks: {tasks.length} | Completed: {
            tasks.filter(t => t.completed).length
          }
        </p>

        {/* Add Task */}
        <div className="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
            placeholder="What do you want to do today?"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-6 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3 w-full">
                
                {/* ✅ Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />

                {editId === task._id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <span className={`font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}>
                    {task.title}
                  </span>
                )}
              </div>

              <div className="flex gap-2 ml-3">
                {editId === task._id ? (
                  <button
                    onClick={() => updateTask(task._id)}
                    className="bg-green-100 text-green-600 px-2 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(task._id);
                      setEditText(task.title);
                    }}
                    className="bg-blue-100 text-blue-600 px-2 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-100 text-red-600 px-2 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;