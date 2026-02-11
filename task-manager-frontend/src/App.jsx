import { useEffect, useState } from "react";
import { Plus, Filter, Layout } from "lucide-react";
import { fetchCategories, fetchTasks, createTask, deleteTask, updateTask } from "./services/api";
import TaskList from "./components/TaskList";
import CategoryList from "./components/CategoryList";

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    // Initial data fetch
    fetchCategories().then(data => setCategories(data || []));
    fetchTasks().then(data => setTasks(data || []));
  }, []);

  const handleCreateTask = () => {
    if (!title || !selectedCategory) return;
    const newTaskData = { title, description, status: "pending", category: selectedCategory };
    createTask(newTaskData).then((newTask) => {
      setTasks(prev => [...prev, newTask]);
      setTitle(""); setDescription(""); setSelectedCategory("");
    });
  };

  const handleStatusChange = (task) => {
    const nextStatus = task.status === "pending" ? "in_progress" : task.status === "in_progress" ? "completed" : "pending";
    updateTask(task.id, { status: nextStatus }).then((updated) => {
      setTasks(prev => prev.map((t) => (t.id === task.id ? updated : t)));
    });
  };

  const filteredTasks = filterCategory === ""
    ? tasks
    : tasks.filter((t) => String(t.category) === filterCategory);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-2">
              <Layout className="text-indigo-600" /> Workspace
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            <Filter size={18} className="text-slate-400" />
            <select
              className="bg-transparent outline-none text-sm font-bold text-slate-600 cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-800">
                <Plus size={20} className="text-indigo-600" /> New Task
              </h2>
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
                  placeholder="Task title"
                  value={title} onChange={e => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none resize-none"
                  placeholder="Details..."
                  value={description} onChange={e => setDescription(e.target.value)}
                />
                <select
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
                  value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="">Assign Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <button
                  onClick={handleCreateTask}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Add Task
                </button>
              </div>
            </div>
            <CategoryList categories={categories} />
          </aside>

          <main className="lg:col-span-8">
            <TaskList
              tasks={filteredTasks}
              onDelete={(id) => deleteTask(id).then(() => setTasks(tasks.filter(t => t.id !== id)))}
              onStatusChange={handleStatusChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;