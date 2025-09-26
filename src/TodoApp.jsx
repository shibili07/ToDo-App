import { Plus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import List from "./TodoList";

function TodoApp() {
  const [Task, SetTask] = useState([]);
  const [inputVal, SetInputVal] = useState("");
  const [button, SetButton] = useState("Add");
  const [selectedtask, Setselectedtask] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const Del = (id) => {
    if (inputVal) {
      SetInputVal("");
      SetButton("Add");
    }
    alert("Are you sure you want to delete this?");
    SetTask((task) => task.filter((t) => t.id !== id));
    setMessage("✅ Task Deleted successfully.");
    setMessageType("success");
  };

  const Edit = (task) => {
    if (task.Completed) {
      setMessage("❌ Cannot edit a completed task.");
      setMessageType("error");
      return;
    }
    SetInputVal(task.text);
    SetButton("Update");
    Setselectedtask(task);
  };

  const changeStatus = (task) => {
    if (inputVal) {
      SetInputVal("");
      SetButton("Add");
    }
    const edited = Task.map((t) =>
      t.id === task.id ? { ...t, Completed: !t.Completed } : t
    );
    SetTask(edited);

    if (!task.Completed) {
      setMessage("✅ Task Marked As Completed.");
      setMessageType("success");
    } else {
      setMessage("🔄 Task marked as incomplete.");
      setMessageType("info");
    }
  };

  const Add = () => {
    if (button === "Update") {
      const exist = Task.some(
        (t) => t.text.toLowerCase().trim() === inputVal.toLowerCase().trim()
      );
      if (exist) {
        setMessage("Duplicate Found. Not Added.");
        setMessageType("info");
        return;
      }
      if (inputVal.trim() === "") {
        setMessage("No Values Found");
        setMessageType("info");
        SetButton("Add");
        return;
      }
      const isValid = /^[a-zA-Z0-9 ]+$/.test(inputVal.trim());
      if (!isValid) {
        setMessage("❌ Task should contain only letters and numbers.");
        setMessageType("error");
        return;
      }
      if (selectedtask) {
        const updated = Task.map((t) =>
          t.id === selectedtask.id ? { ...t, text: inputVal } : t
        );
        SetTask(updated);
        Setselectedtask(null);
        SetInputVal("");
        SetButton("Add");
        setMessage("✅ Task updated successfully.");
        setMessageType("success");
      }
    } else {
      if (inputVal.trim() === "") {
        setMessage("No Values Found");
        setMessageType("info");
        SetButton("Add");
        return;
      }
      const isValid = /^[a-zA-Z0-9 ]+$/.test(inputVal.trim());
      if (!isValid) {
        setMessage("❌ Task should contain only letters and numbers.");
        setMessageType("error");
        return;
      }
      const newTask = {
        id: uuidv4(),
        text: inputVal,
        Completed: false,
      };
      const isExist = Task.some(
        (task) => task.text.toLowerCase().trim() === inputVal.toLowerCase().trim()
      );
      if (isExist) {
        setMessage("Duplicate Found. Not Added.");
        setMessageType("info");
        return;
      }
      SetTask([...Task, newTask]);
      SetInputVal("");
      setMessage("✅ Task Added successfully.");
      setMessageType("success");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-500 text-lg">Stay organized and productive</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`px-5 py-3 rounded-lg mb-6 text-sm font-medium text-center ${
              messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : messageType === "error"
                ? "bg-red-100 text-red-800 border border-red-300"
                : "bg-yellow-100 text-yellow-800 border border-yellow-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Input Box */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => SetInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") Add();
              }}
              placeholder="Add a new task..."
              className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
            />
            <button
              onClick={Add}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {button}
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-200 overflow-hidden">
          {Task.map((task) => (
            <List
              key={task.id}
              task={task}
              changeStatus={changeStatus}
              Edit={Edit}
              Del={Del}
            />
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          Click the checkbox to mark tasks as complete
        </p>
      </div>
    </div>
  );
}

export default TodoApp;
