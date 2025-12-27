import { useState } from "react";

export default function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [status, setStatus] = useState(task.status || "pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, dueDate, status });
  };

  return (
    <div 
      className="fixed inset-0 z-10 flex items-center justify-center px-4" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <form
        className="w-full max-w-md space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-medium text-gray-900">Add Task</h3>

        <input
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="rounded border border-gray-300 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
            type="submit"
          >
            Save
          </button>
          <button
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}