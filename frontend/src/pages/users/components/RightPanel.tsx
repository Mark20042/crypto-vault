import { Sparkles, UserPlus, Users } from "lucide-react";
import { motion } from "framer-motion";
import { type Friend } from "./Sidebar";

interface Suggestion {
  id: number;
  name: string;
  avatar: string;
}

interface RightPanelProps {
  onlineFriends: Friend[];
  groups?: Friend[];
  suggestions: Suggestion[];
  onSelectFriend: (friend: Friend) => void;
  onOpenFindFriends: () => void;
}

export default function RightPanel({
  onlineFriends,
  groups = [],
  suggestions,
  onSelectFriend,
  onOpenFindFriends,
}: RightPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex w-64 flex-col shrink-0 h-[calc(100vh-7rem)] bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-emerald-500/5 rounded-2xl overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col pt-2">
        
        {/* Online Friends Section */}
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Online — {onlineFriends.length}
          </h3>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        </div>
        <div className="px-2 space-y-0.5 pb-2">
          {onlineFriends.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFriend(f)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 transition-all text-left group"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:shadow-md group-hover:shadow-emerald-500/20 transition-all">
                  {f.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-emerald-700 transition-colors">
                  {f.name}
                </p>
                <p className="text-[10px] text-emerald-600 font-medium">Active now</p>
              </div>
            </button>
          ))}
          {onlineFriends.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">No friends online</p>
          )}
        </div>

        {/* Group Chats Section */}
        {groups.length > 0 && (
          <>
            <div className="px-4 py-3 mt-1 border-t border-slate-100/60 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Group chats
              </h3>
            </div>
            <div className="px-2 space-y-0.5 pb-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => onSelectFriend(group)}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 transition-all text-left group"
                >
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm border border-indigo-200/50 group-hover:border-indigo-300 transition-all">
                      {group.avatar}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate group-hover:text-indigo-700 transition-colors">
                      {group.name}
                    </p>
                    {group.unread > 0 ? (
                      <p className="text-[10px] text-indigo-600 font-semibold">{group.unread} new messages</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 font-medium">No new messages</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <>
            <div className="px-4 py-3 mt-1 border-t border-slate-100/60 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                People you may know
              </h3>
            </div>
            <div className="px-2 pb-4 space-y-0.5">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:border-emerald-300 transition-all shrink-0">
                      {s.avatar}
                    </div>
                    <p className="text-sm font-medium text-slate-700 truncate">{s.name}</p>
                  </div>
                  <button
                    onClick={onOpenFindFriends}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all shrink-0"
                    title="Add Friend"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
