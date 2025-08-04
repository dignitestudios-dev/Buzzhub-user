import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const Chat = () => {
  const [update, setUpdate] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackClick = () => {
    setSelectedChat(null);
  };

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  return (
    <div className="w-full h-full max-w-7xl mx-auto p-4 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      
      {/* Left Side - Chat List */}
      <div
        className={`${
          selectedChat ? "hidden md:block" : "block"
        } w-full md:w-1/3 bg-white p-4 rounded-lg border`}
      >
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-4">
          Chats
        </h1>
        <ChatList
          userId={user?.uid || null}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setUpdate={setUpdate}
          update={update}
          chatId={selectedChat?.id}
        />
      </div>

      {/* Right Side - Chat Screen */}
      <div
        className={`${
          selectedChat ? "block" : "hidden md:block"
        } w-full md:w-2/3 bg-white h-[600px] pb-20 lg:pb-0  rounded-lg  flex flex-col`}
      >
        {selectedChat ? (
          <>
            {/* Mobile Back Button */}
            <button
              className="md:hidden mb-4 flex items-center text-gray-600 hover:text-black"
              onClick={handleBackClick}
            >
              <BsArrowLeft className="mr-2" />
              Back to Chats
            </button>

            <ChatScreen
              selectedChat={selectedChat}
              chatId={selectedChat?.id}
              userId={user?.uid || null}
              setUpdate={setUpdate}
              update={update}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg shadow-inner">
            <p className="text-lg text-gray-500">
              Select a chat to view the conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
