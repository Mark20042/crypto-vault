import { useState } from "react";
import { Users, X } from "lucide-react";

interface NewGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewGroupModal({ isOpen, onClose }: NewGroupModalProps) {
  const [groupName, setGroupName] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {

    if (groupName.trim()) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-crypto-dark/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden transform transition-all">
        <div className="flex items-center justify-between p-5 border-b border-emerald-100 bg-slate-50">
          <h3 className="text-xl font-serif font-semibold text-slate-800">
            Create <span className="text-gradient">Group</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-dashed border-emerald-300">
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Group Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Weekend Warriors"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={!groupName.trim()}
            className={`w-full py-3 px-4 font-medium rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm ${
              groupName.trim()
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}
