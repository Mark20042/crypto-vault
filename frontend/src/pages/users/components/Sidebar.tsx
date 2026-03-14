import { useState } from "react";
import { Search, Users, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
  time: string;
  unread: number;
}

interface SidebarProps {
  friends: Friend[];
  groups?: Friend[];
  activeFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
  onOpenFindFriends: () => void;
  onOpenNewGroup: () => void;
}

export default function Sidebar({
  friends,
  groups = [],
  activeFriend,
  onSelectFriend,
  onOpenFindFriends,
  onOpenNewGroup,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"chats" | "online">("chats");

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = friends.filter((f) => f.status === "online");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full sm:w-80 md:w-[22rem] flex flex-col bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-emerald-500/5 rounded-2xl overflow-hidden shrink-0 hidden md:flex h-[calc(100vh-7rem)]"
    >
      <div className="p-4 pb-3 border-b border-emerald-100/80 bg-white/60">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="text-lg font-serif font-semibold text-slate-800">
            Messages
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenNewGroup}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="New Group"
            >
              <Users className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenFindFriends}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Find Friends"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => setTab("chats")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${tab === "chats"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
          >
            All Chats
          </button>
          <button
            onClick={() => setTab("online")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${tab === "online"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
          >
            Online
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
              {onlineFriends.length}
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        {(tab === "online" ? onlineFriends : filteredFriends).map((friend) => (
          <button
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left group ${activeFriend?.id === friend.id
                ? "bg-emerald-50 border border-emerald-100 shadow-sm"
                : "hover:bg-slate-50 border border-transparent"
              }`}
          >
            <div className="relative shrink-0">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeFriend?.id === friend.id
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
              >
                {friend.avatar}
              </div>
              {friend.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-sm font-semibold text-slate-800 truncate">
                  {friend.name}
                </h3>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium ml-2">
                  {friend.time}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {friend.lastMessage}
              </p>
            </div>
            {friend.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm shadow-emerald-500/30">
                {friend.unread}
              </div>
            )}
          </button>
        ))}

        {(tab === "chats" ? filteredFriends : onlineFriends).length === 0 && (
          <div className="text-center py-10 px-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm font-medium">No results found</p>
          </div>
        )}

        {tab === "chats" && groups.length > 0 && (
          <>
            <div className="px-3 pt-4 pb-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Group chats</p>
            </div>
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => onSelectFriend(group)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left group ${activeFriend?.id === group.id
                    ? "bg-emerald-50 border border-emerald-100 shadow-sm"
                    : "hover:bg-slate-50 border border-transparent"
                  }`}
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-200/50">
                  {group.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{group.name}</h3>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium ml-2">{group.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{group.lastMessage}</p>
                </div>
                {group.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm">
                    {group.unread}
                  </div>
                )}
              </button>
            ))}
          </>
        )}
      </div>

    </motion.div>
  );
}
