export default function TaskHeader({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  onAdd,
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>

      <select
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
      </select>

      <button
        className="w-full rounded border border-gray-300 bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-900"
        onClick={onAdd}
      >
        Add Task
      </button>
    </div>
  );
}