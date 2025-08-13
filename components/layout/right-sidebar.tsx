"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Hash, MessageCircle, Plus, TrendingUp, Users } from "lucide-react";

// Mock data for trending topics and suggested friends
const trendingTopics = [
  { id: 1, topic: "#TechNews", posts: "2.5K posts" },
  { id: 2, topic: "#Travel2024", posts: "1.8K posts" },
  { id: 3, topic: "#FoodieLife", posts: "3.2K posts" },
  { id: 4, topic: "#FitnessGoals", posts: "1.5K posts" },
  { id: 5, topic: "#Photography", posts: "2.1K posts" },
];

const suggestedFriends = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    mutualFriends: 12,
    mutualInterests: ["Photography", "Travel"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/avatars/maria.jpg",
    mutualFriends: 8,
    mutualInterests: ["Cooking", "Art"],
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/avatars/david.jpg",
    mutualFriends: 15,
    mutualInterests: ["Technology", "Music"],
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "/avatars/emma.jpg",
    mutualFriends: 6,
    mutualInterests: ["Fitness", "Reading"],
  },
];

export function RightSidebar() {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-80 space-y-6"
    >
      {/* Trending Topics */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Trending Topics</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            See All
          </Button>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Hash className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">{topic.topic}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.posts}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Suggested Friends */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Suggested Friends</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-green-700"
          >
            See All
          </Button>
        </div>

        <div className="space-y-4">
          {suggestedFriends.map((friend) => (
            <div
              key={friend.id}
              className="grid grid-cols-[auto,1fr,auto] items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border"
            >
              <div className="flex gap-x-2 items-center">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-green-600 to-blue-600 text-white text-sm font-medium">
                    {friend.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="font-medium text-gray-900 truncate">
                    {friend.name}
                  </p>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {friend.mutualFriends} mutual friends
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap gap-1 mt-1">
                  {friend.mutualInterests.slice(0, 2).map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 justify-start">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 h-8"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden lg:inline">Add Friend</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 flex items-center gap-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden lg:inline">Message</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
