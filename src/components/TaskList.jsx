import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggleStatus }) {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="mt-4 rounded-lg border border-gray-300 bg-white px-4 py-6 text-center text-sm text-gray-500">
        No tasks found.
      </p>
    );
  }

  return (
    <ul className="mt-5 flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}