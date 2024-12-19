"use client";

import { useState, ChangeEvent } from "react";

type Task = {
  id: number;
  text: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const addTask = () => {
    if (taskText.trim() === "") return;

    const newTask: Task = { id: Date.now(), text: taskText };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText("");
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">To-Do App</h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={taskText}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <span className="text-gray-700">{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
}
