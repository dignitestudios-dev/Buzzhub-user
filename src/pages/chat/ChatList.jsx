import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats, markMessagesAsRead, fetchUser } from "../../firebase/firestoreService";
import useUnreadMessages from "./useUnreadMessages";

const ChatList = ({ userId, setSelectedChat, selectedChat, update, setUpdate }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const unreadCounts = useUnreadMessages(userId);

  useEffect(() => {
    const fetchChats = async () => {
      const user = await fetchUser(userId);
      const chatData = await getChats(userId);
      setChats(chatData);
    };

    fetchChats();
  }, [userId, update]);

  useEffect(() => {
    if (selectedChat !== null) {
      const updatedChat = chats?.find((chat) => selectedChat?.id === chat?.id);
      if (updatedChat) setSelectedChat(updatedChat);
    }
  }, [chats]);

  return (
    <ul className="space-y-2 overflow-auto h-full p-2">
      {chats.length === 0 ? (
        <li className="text-gray-500 text-center py-10 text-lg font-medium">
          No chats yet
        </li>
      ) : (
        chats.map((chat) => {
          const isSelected = selectedChat?.id === chat?.id;
          const unread = unreadCounts[chat?.id] || 0;

          return (
            <li
              key={chat?.id}
              onClick={() => {
                setSelectedChat(chat);
                if (unread > 0) markMessagesAsRead(chat?.id, userId);
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border 
                ${isSelected
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"}`}
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center space-x-4 overflow-hidden">
                <img
                  src={chat?.otherUser?.image || "/placeholder.png"}
                  alt={chat?.otherUser?.name || "User"}
                  className="w-12 h-12 rounded-full border object-cover bg-gray-100 flex-shrink-0"
                />

                <div className="min-w-0">
                  <p
                    className={`font-semibold truncate text-[16px] ${
                      isSelected ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {chat?.otherUser?.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {chat?.last_msg?.content || "No messages yet"}
                  </p>
                </div>
              </div>

              {/* Right: Unread badge */}
              {unread > 0 && (
                <span className="bg-green-600 text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ml-2">
                  {unread}
                </span>
              )}
            </li>
          );
        })
      )}
    </ul>
  );
};

export default ChatList;
