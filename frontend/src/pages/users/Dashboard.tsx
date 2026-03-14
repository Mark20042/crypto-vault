import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/utils/thunk";
import { fetchSession, logout } from "../../store/features/authSlice";
import { MessageCircle, Loader2 } from "lucide-react";

import Sidebar, { type Friend } from "./components/Sidebar";
import ChatArea, { type Message } from "./components/ChatArea";
import RightPanel from "./components/RightPanel";
import DashboardHeader from "./components/DashboardHeader";
import FindFriendsModal from "./components/FindFriendsModal";
import NewGroupModal from "./components/NewGroupModal";

const mockFriends: Friend[] = [
  { id: 1, name: "Alice Freeman", avatar: "AF", status: "online", lastMessage: "See you tomorrow!", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Bob Smith", avatar: "BS", status: "offline", lastMessage: "Thanks for the design files.", time: "Yesterday", unread: 0 },
  { id: 3, name: "Charlie Davis", avatar: "CD", status: "online", lastMessage: "Are we still on for the meeting?", time: "2:15 PM", unread: 0 },
  { id: 4, name: "Diana Prince", avatar: "DP", status: "online", lastMessage: "Haha, that's hilarious 😄", time: "1:00 PM", unread: 1 },
  { id: 5, name: "Eve Collins", avatar: "EC", status: "online", lastMessage: "Let's catch up soon!", time: "11:00 AM", unread: 0 },
  { id: 6, name: "Frank Castle", avatar: "FC", status: "offline", lastMessage: "I'll send the report later.", time: "9:45 AM", unread: 0 },
  { id: 7, name: "Grace Hopper", avatar: "GH", status: "online", lastMessage: "The code is compiling 🚀", time: "8:30 AM", unread: 3 },
  { id: 8, name: "Henry Ford", avatar: "HF", status: "offline", lastMessage: "Let me know when you're free.", time: "Yesterday", unread: 0 },
  { id: 9, name: "Ivy Chen", avatar: "IC", status: "online", lastMessage: "Great presentation today!", time: "3:00 PM", unread: 0 },
  { id: 10, name: "Jack Wilson", avatar: "JW", status: "offline", lastMessage: "See the attachment I sent.", time: "Mon", unread: 0 },
  { id: 11, name: "Karen Lopez", avatar: "KL", status: "online", lastMessage: "Happy birthday! 🎂", time: "11:15 AM", unread: 1 },
  { id: 12, name: "Leo Martinez", avatar: "LM", status: "offline", lastMessage: "Can you review my PR?", time: "Sun", unread: 0 },
];

export const mockGroups: Friend[] = [
  { id: 301, name: "Crypto Builders 🔥", avatar: "CB", status: "online", lastMessage: "Release v2.0 is live!", time: "12:00 PM", unread: 8 },
  { id: 302, name: "Design Team", avatar: "DT", status: "online", lastMessage: "New mockups are ready.", time: "11:30 AM", unread: 0 },
  { id: 303, name: "Weekend Warriors", avatar: "WW", status: "offline", lastMessage: "Who's joining Saturday?", time: "Yesterday", unread: 2 },
];

const mockChatMap: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "Alice Freeman", text: "Hey! How's the new project going?", time: "10:15 AM", isMe: false },
    { id: 2, sender: "Me", text: "It's going great! Just working on the new light green theme now.", time: "10:18 AM", isMe: true },
    { id: 3, sender: "Alice Freeman", text: "Oh nice! I heard it's supposed to be very calm and cozy.", time: "10:20 AM", isMe: false },
    { id: 4, sender: "Me", text: "Exactly. It feels much more refreshing.", time: "10:22 AM", isMe: true },
    { id: 5, sender: "Alice Freeman", text: "Can't wait to see it. See you tomorrow!", time: "10:30 AM", isMe: false },
  ],
  4: [
    { id: 1, sender: "Diana Prince", text: "Have you seen the latest meme?", time: "12:55 PM", isMe: false },
    { id: 2, sender: "Me", text: "No, send it! 😂", time: "12:58 PM", isMe: true },
    { id: 3, sender: "Diana Prince", text: "Haha, that's hilarious 😄", time: "1:00 PM", isMe: false },
  ],
};

export const mockSuggestions = [
  { id: 201, name: "Olivia Martinez", avatar: "OM" },
  { id: 202, name: "Liam Johnson", avatar: "LJ" },
  { id: 203, name: "Sophia Brown", avatar: "SB" },
  { id: 204, name: "Noah Wilson", avatar: "NW" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const [activeFriend, setActiveFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isFindFriendsOpen, setIsFindFriendsOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchSession())
        .unwrap()
        .catch(() => {
          navigate("/auth/login");
        });
    }
  }, [dispatch, user, navigate]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleSelectFriend = (friend: Friend) => {
    setActiveFriend(friend);
    setMessages(mockChatMap[friend.id] || []);
  };

  const handleSendMessage = (text: string) => {
    const newMsg: Message = {
      id: Date.now(),
      sender: "Me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-crypto-primary animate-spin" />
      </div>
    );
  }

  const currentUser = {
    id: Number(user.id) || 1,
    name: user.name || "User",
    email: user.email || "user@cozyconvo.app",
  };

  const onlineFriends = mockFriends.filter((f) => f.status === "online");

  return (
    <div className="min-h-screen bg-crypto-dark flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <DashboardHeader user={currentUser} onLogout={handleLogout} />

      <main className="flex-1 flex overflow-hidden w-full px-4 sm:px-6 py-4 gap-5 relative z-10">
        <Sidebar
          friends={mockFriends}
          activeFriend={activeFriend}
          onSelectFriend={handleSelectFriend}
          onOpenFindFriends={() => setIsFindFriendsOpen(true)}
          onOpenNewGroup={() => setIsNewGroupOpen(true)}
        />

        {activeFriend ? (
          <ChatArea
            activeFriend={activeFriend}
            messages={messages}
            onSendMessage={handleSendMessage}
            onClose={() => setActiveFriend(null)}
          />
        ) : (
          /* Welcome / Home State */
          <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-7rem)] rounded-2xl bg-white/40 backdrop-blur-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 border border-emerald-200 shadow-md">
                <MessageCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-serif font-semibold text-slate-800 mb-3">
                Welcome back, <span className="text-gradient">{user.name?.split(" ")[0]}</span>
              </h2>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Select a conversation from the sidebar to start chatting, or find new friends to connect with.
              </p>

              {onlineFriends.length > 0 && (
                <div className="mt-10 w-full max-w-md">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Friends Online Now</p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {onlineFriends.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleSelectFriend(f)}
                        className="flex flex-col items-center gap-1.5 group"
                      >
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform ring-2 ring-white">
                            {f.avatar}
                          </div>
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium truncate max-w-[70px] group-hover:text-emerald-700 transition-colors">
                          {f.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <RightPanel
          onlineFriends={onlineFriends}
          groups={mockGroups}
          suggestions={mockSuggestions}
          onSelectFriend={handleSelectFriend}
          onOpenFindFriends={() => setIsFindFriendsOpen(true)}
        />
      </main>

      <FindFriendsModal isOpen={isFindFriendsOpen} onClose={() => setIsFindFriendsOpen(false)} />
      <NewGroupModal isOpen={isNewGroupOpen} onClose={() => setIsNewGroupOpen(false)} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}
