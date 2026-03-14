import { useState } from "react";
import { Search, Send, X } from "lucide-react";

interface FindFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockUsers = [
  { id: 101, name: "Emma Watson", avatar: "EW", desc: "Available for chat" },
  { id: 102, name: "Frank Castle", avatar: "FC", desc: "Busy" },
  { id: 103, name: "Grace Hopper", avatar: "GH", desc: "Offline" },
];

export default function FindFriendsModal({ isOpen, onClose }: FindFriendsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  if (!isOpen) return null;

  const handleAddFriend = (id: number) => {
    setSentRequests((prev) => [...prev, id]);
  };

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-crypto-dark/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden transform transition-all">
        <div className="flex items-center justify-between p-5 border-b border-emerald-100 bg-slate-50">
          <h3 className="text-xl font-serif font-semibold text-slate-800">
            Find <span className="text-gradient">Friends</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <input
              autoFocus
              type="text"
              placeholder="Search users to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="mt-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
                    {user.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(user.id)}
                  disabled={sentRequests.includes(user.id)}
                  className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-sm font-medium ${
                    sentRequests.includes(user.id)
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {sentRequests.includes(user.id) ? "Sent" : "Message"}
                </button>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">No users found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
