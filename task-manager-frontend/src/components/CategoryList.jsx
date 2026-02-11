import { Folder } from "lucide-react";

function CategoryList({ categories = [] }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Projects</h2>
      <div className="space-y-1">
        {categories?.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
            <Folder size={16} className="text-slate-300" />
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;