import { useEffect, useMemo, useState } from "react";
import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import { loadTasks, saveTasks } from "./services/taskStorage";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date"); 
  const [editingTask, setEditingTask] = useState(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);
  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    if (filter !== "all") {
      result = result.filter((t) => t.status === filter);
    }

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(term));
    }

    result.sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return result;
  }, [tasks, filter, debouncedSearch, sortBy]);

  const handleSave = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg border border-gray-300 bg-white p-6 shadow">
        <h1 className="text-2xl font-medium text-gray-900">Task Tracker</h1>

        <TaskHeader
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAdd={() => setEditingTask({})}
        />

        <TaskList
          tasks={visibleTasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        {editingTask !== null && (
          <TaskModal 
            task={editingTask} 
            onClose={() => setEditingTask(null)} 
            onSave={handleSave} 
          />
        )}
      </div>
    </div>
  );
}