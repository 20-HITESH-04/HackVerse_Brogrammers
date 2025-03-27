"use client";
import React, { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { Navbar } from '../../../Components/user/Navbar';
import { Sidebar } from '../../../Components/user/Sidebar';

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user", timestamp: new Date() }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar />
        <main className="md:ml-64 mt-16 flex flex-col w-full h-[calc(100vh-4rem)] relative">
          {/* Chat Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-white shadow-inner">
            <div className="text-center text-blue-500 py-2 text-sm italic">
              Enter how you are feeling? Describe symptoms in detail for accurate help.
            </div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs md:max-w-sm bg-blue-200 p-3 rounded-lg shadow-md">
                  <p className="text-blue-900">{msg.text}</p>
                  <p className="text-xs text-right text-blue-600 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area - Fixed to Bottom */}
          <div className="sticky bottom-0 bg-blue-100 p-4 flex items-center space-x-3 border-t border-blue-200">
            <button className="text-blue-600 hover:text-blue-800">
              <Paperclip size={24} />
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Smile size={24} />
            </button>
            <div className="flex-grow">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-3 rounded-lg bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Send size={24} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;