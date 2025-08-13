"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Ban,
  Check,
  CheckCheck,
  Edit3,
  Flag,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Trash2,
  UserPlus,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
}

interface ConversationType {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    status: string;
    lastSeen: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
  messages: Message[];
}

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [messageText, setMessageText] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showConversationMenu, setShowConversationMenu] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Wilson",
        username: "sarah_wilson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        status: "online",
        lastSeen: "now",
      },
      lastMessage: "Hey! How's the new project going?",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isPinned: true,
      messages: [
        {
          id: 1,
          text: "Hey! How's the new project going?",
          sender: "sarah_wilson",
          timestamp: "2 min ago",
          isRead: false,
        },
        {
          id: 2,
          text: "It's going great! We're making good progress",
          sender: "me",
          timestamp: "1 min ago",
          isRead: true,
        },
        {
          id: 3,
          text: "That's awesome! Can't wait to see the final result",
          sender: "sarah_wilson",
          timestamp: "2 min ago",
          isRead: false,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Mike Johnson",
        username: "mike_j",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        status: "away",
        lastSeen: "5 min ago",
      },
      lastMessage: "Thanks for the help yesterday!",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isPinned: false,
      messages: [
        {
          id: 1,
          text: "Thanks for the help yesterday!",
          sender: "mike_j",
          timestamp: "1 hour ago",
          isRead: true,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        username: "emma_davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        status: "online",
        lastSeen: "now",
      },
      lastMessage: "Are you free for a quick call?",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      isPinned: false,
      messages: [
        {
          id: 1,
          text: "Are you free for a quick call?",
          sender: "emma_davis",
          timestamp: "3 hours ago",
          isRead: false,
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Tom Brown",
        username: "tom_brown",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        status: "offline",
        lastSeen: "2 hours ago",
      },
      lastMessage: "See you at the meeting tomorrow!",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isPinned: false,
      messages: [
        {
          id: 1,
          text: "See you at the meeting tomorrow!",
          sender: "tom_brown",
          timestamp: "1 day ago",
          isRead: true,
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Lisa Anderson",
        username: "lisa_a",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        status: "online",
        lastSeen: "now",
      },
      lastMessage: "The design looks perfect!",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      isPinned: false,
      messages: [
        {
          id: 1,
          text: "The design looks perfect!",
          sender: "lisa_a",
          timestamp: "2 days ago",
          isRead: true,
        },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const conversationMenuRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  // Close conversation menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        conversationMenuRef.current &&
        !conversationMenuRef.current.contains(event.target as Node)
      ) {
        setShowConversationMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedConversation) {
      const newMessage: Message = {
        id: Date.now(), // Changed to Date.now() to match existing Message interface
        text: messageText.trim(),
        sender: "me",
        timestamp: new Date().toISOString(), // Changed to new Date().toISOString()
        isRead: true,
      };

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      );

      // Update selected conversation
      setSelectedConversation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
      });

      setMessageText("");
      scrollToBottom();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as React.FormEvent);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const formatTime = (timestamp: string) => {
    if (timestamp === "now") return "now";
    if (timestamp.includes("min")) return timestamp;
    if (timestamp.includes("hour")) return timestamp;
    if (timestamp.includes("day")) return timestamp;
    return timestamp;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto h-[calc(100vh-4rem)] flex flex-col md:flex-row w-full">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <Button
                onClick={() => setShowNewMessage(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1 p-2"
            >
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  variants={itemVariants}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                          {conversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                          conversation.user.status
                        )}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {conversation.user.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>

                    {conversation.unreadCount > 0 && (
                      <Badge className="ml-2 bg-blue-600 text-white text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative w-full">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedConversation.user.avatar}
                          alt={selectedConversation.user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                          {selectedConversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                          selectedConversation.user.status
                        )}`}
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {selectedConversation.user.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.user.status === "online"
                          ? "Online"
                          : `Last seen ${selectedConversation.user.lastSeen}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setShowConversationMenu(!showConversationMenu)
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message: Message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "me"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm break-words">{message.text}</p>
                      <div
                        className={`flex items-center justify-end space-x-1 mt-1 ${
                          message.sender === "me"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="text-xs">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "me" &&
                          (message.isRead ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFileUpload}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFileUpload}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      <Button size="sm" variant="outline">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Conversation Menu - Fixed positioning */}
              <AnimatePresence>
                {showConversationMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40 min-w-[200px]"
                  >
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Add to contacts</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Archive className="h-4 w-4" />
                      <span>Archive chat</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Ban className="h-4 w-4" />
                      <span>Block user</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete chat</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Edit3 className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      <AnimatePresence>
        {showNewMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewMessage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  New Message
                </h3>
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <Input placeholder="Search for a user..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewMessage(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        multiple
      />
    </div>
  );
}
