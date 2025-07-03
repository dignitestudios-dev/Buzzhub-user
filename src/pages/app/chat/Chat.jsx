import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const mockChats = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Sure, see you then!",
    avatar: "https://i.pravatar.cc/100?img=32",
    messages: [
      { id: 1, text: "Hey Alice!", sender: "me" },
      { id: 2, text: "Sure, see you then!", sender: "Alice" },
    ],
  },
  {
    id: 2,
    name: "Mark Wayne",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/100?img=12",
    messages: [
      { id: 1, text: "Can you send the file?", sender: "Mark" },
    ],
  },
];

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [input, setInput] = useState("");

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  const handleSend = () => {
    if (input.trim()) {
      selectedChat.messages.push({
        id: Date.now(),
        text: input,
        sender: "me",
      });
      setInput("");
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="flex flex-col md:flex-row h-screen  border rounded-lg overflow-hidden pb-20 lg:pb-0">
      {/* Chat List */}
      <div
        className={`${
          selectedChatId && isMobile ? "hidden" : "block"
        } md:block w-full md:w-1/3 bg-white border-r overflow-y-auto`}
      >
        <div className="p-4 font-bold text-lg border-b hidden md:block">
          Messages
        </div>
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChatId(chat.id)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
              selectedChatId === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Screen */}
      {selectedChatId && (
        <div className="w-full md:w-2/3 flex flex-col bg-white h-full">
          {/* Header */}
          <div className="flex items-center p-4 border-b bg-white">
            {/* Back button on mobile */}
            <button
              className="md:hidden mr-3"
              onClick={() => setSelectedChatId(null)}
            >
              <IoMdArrowBack size={24} />
            </button>
            <img
              src={selectedChat.avatar}
              alt="user"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{selectedChat.name}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 h-full">
            {selectedChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  msg.sender === "me"
                    ? "ml-auto bg-green-100 text-right"
                    : "mr-auto bg-white border"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
