import { useState } from "react";
import { MoreVertical, Paperclip, Send, Smile, ArrowLeft } from "lucide-react";

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
}

interface ChatAreaProps {
  activeFriend: Friend;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
}

export default function ChatArea({ activeFriend, messages, onSendMessage, onClose }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-sm relative overflow-hidden h-[calc(100vh-7rem)] rounded-2xl border border-slate-100 shadow-sm">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

      {/* Chat Header */}
      <div className="h-16 px-4 border-b border-emerald-100/80 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20">
              {activeFriend.avatar}
            </div>
            {activeFriend.status === "online" && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm leading-tight">
              {activeFriend.name}
            </h3>
            <p className="text-xs text-emerald-600 font-medium">
              {activeFriend.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar relative z-10">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-slate-400 text-sm">No messages yet. Say hello! 👋</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[75%] lg:max-w-[65%] rounded-2xl px-4 py-2.5 ${
                msg.isMe
                  ? "bg-emerald-500 text-white rounded-tr-sm shadow-md shadow-emerald-500/10"
                  : "bg-white text-slate-800 rounded-tl-sm border border-slate-100 shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 font-medium px-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white/80 backdrop-blur-md border-t border-emerald-100/80 shrink-0 relative z-10">
        <div className="flex items-center gap-2 max-w-5xl mx-auto">
          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all shrink-0">
            <Paperclip className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder-slate-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-all">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
              newMessage.trim()
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 transform hover:scale-105"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
