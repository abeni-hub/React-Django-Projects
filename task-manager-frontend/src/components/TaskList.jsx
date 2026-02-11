import { Trash2, CheckCircle2, Circle, Clock } from "lucide-react";

function TaskList({ tasks = [], onDelete, onStatusChange }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-medium">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all flex items-center justify-between group">
          <div className="flex gap-4">
            <button onClick={() => onStatusChange(task)} className="mt-1">
              {task.status === 'completed' ?
                <CheckCircle2 className="text-emerald-500" /> :
                <Circle className="text-slate-300 hover:text-indigo-500" />
              }
            </button>
            <div>
              <h3 className={`font-bold ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {task.title}
              </h3>
              <p className="text-slate-500 text-sm">{task.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  task.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;