"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Mock friends data
  const friends = [
    {
      id: 1,
      name: "Sarah Wilson",
      username: "sarah_wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      status: "online",
      mutualFriends: 12,
      location: "New York, NY",
      lastActive: "2 hours ago",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mike_j",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      status: "offline",
      mutualFriends: 8,
      location: "Los Angeles, CA",
      lastActive: "1 day ago",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      username: "emma_davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      status: "online",
      mutualFriends: 15,
      location: "Chicago, IL",
      lastActive: "30 minutes ago",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Tom Brown",
      username: "tom_brown",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      status: "away",
      mutualFriends: 6,
      location: "Miami, FL",
      lastActive: "3 hours ago",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      username: "lisa_a",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      status: "online",
      mutualFriends: 20,
      location: "Seattle, WA",
      lastActive: "1 hour ago",
      isFavorite: true,
    },
    {
      id: 6,
      name: "David Chen",
      username: "david_chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      status: "offline",
      mutualFriends: 10,
      location: "Austin, TX",
      lastActive: "2 days ago",
      isFavorite: false,
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: "Alex Thompson",
      username: "alex_t",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      mutualFriends: 5,
      location: "Denver, CO",
    },
    {
      id: 2,
      name: "Rachel Green",
      username: "rachel_g",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      mutualFriends: 8,
      location: "Portland, OR",
    },
  ];

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Friends</h1>
                <p className="text-gray-600 mt-2">
                  Connect with your friends and discover new connections
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowAddFriend(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex space-x-1">
              {[
                { id: "all", label: "All Friends", count: friends.length },
                {
                  id: "online",
                  label: "Online",
                  count: friends.filter((f) => f.status === "online").length,
                },
                {
                  id: "requests",
                  label: "Friend Requests",
                  count: friendRequests.length,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Friends Grid */}
          {activeTab === "all" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                            friend.status === "online"
                              ? "bg-green-500"
                              : friend.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{friend.username}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {friend.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mutual friends</span>
                      <span className="font-medium text-gray-900">
                        {friend.mutualFriends}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last active</span>
                      <span className="text-gray-500">{friend.lastActive}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant={friend.isFavorite ? "default" : "outline"}
                      className="px-3"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          friend.isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Friend Requests */}
          {activeTab === "requests" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {friendRequests.map((request) => (
                <motion.div
                  key={request.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={request.avatar} alt={request.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold">
                        {request.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {request.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        @{request.username}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {request.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mutual friends</span>
                      <span className="font-medium text-gray-900">
                        {request.mutualFriends}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Decline
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Online Friends */}
          {activeTab === "online" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {friends
                .filter((friend) => friend.status === "online")
                .map((friend) => (
                  <motion.div
                    key={friend.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-green-600 font-medium">
                          Online now
                        </p>
                      </div>
                      <Button size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
