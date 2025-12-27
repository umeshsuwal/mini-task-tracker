export default function TaskItem({ task, onDelete, onToggleStatus }) {
  const isDone = task.status === "done";
  
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3">
      <div className="space-y-1">
        <div className="text-base font-medium text-gray-900">{task.title}</div>
        <div className="text-sm text-gray-500">Due: {task.dueDate}</div>
        <span
          className={`inline-block rounded px-2 py-1 text-xs font-medium capitalize ${
            isDone ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => onToggleStatus(task.id)}
        >
          {isDone ? "Mark Pending" : "Mark Done"}
        </button>
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}