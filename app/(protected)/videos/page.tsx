"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Clock,
  Eye,
  Filter,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock video categories
  const categories = [
    { id: "all", label: "All Videos", count: 24 },
    { id: "trending", label: "Trending", count: 8 },
    { id: "music", label: "Music", count: 6 },
    { id: "gaming", label: "Gaming", count: 4 },
    { id: "education", label: "Education", count: 3 },
    { id: "sports", label: "Sports", count: 3 },
  ];

  // Mock videos data
  const mockVideos = [
    {
      id: 1,
      title: "Amazing Sunset at the Beach",
      description:
        "Beautiful sunset captured during our beach vacation. The colors were absolutely magical!",
      thumbnail:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop&crop=center",
      duration: "2:34",
      views: "12.5K",
      likes: "1.2K",
      dislikes: "45",
      comments: "234",
      author: "John Doe",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      category: "trending",
      uploadDate: "2 days ago",
      isLiked: false,
      isDisliked: false,
    },
    {
      id: 2,
      title: "Cooking Tutorial: Homemade Pizza",
      description:
        "Learn how to make delicious homemade pizza from scratch with simple ingredients.",
      thumbnail:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=225&fit=crop&crop=center",
      duration: "8:45",
      views: "8.9K",
      likes: "567",
      dislikes: "23",
      comments: "89",
      author: "Sarah Wilson",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      category: "education",
      uploadDate: "1 week ago",
      isLiked: true,
      isDisliked: false,
    },
    {
      id: 3,
      title: "Gaming Highlights: Epic Win Streak",
      description:
        "Incredible gaming session with 15 wins in a row! Check out these amazing plays.",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop&crop=center",
      duration: "12:18",
      views: "25.3K",
      likes: "3.4K",
      dislikes: "156",
      comments: "567",
      author: "Mike Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      category: "gaming",
      uploadDate: "3 days ago",
      isLiked: false,
      isDisliked: false,
    },
    {
      id: 4,
      title: "Live Concert: Rock Band Performance",
      description:
        "Amazing live performance from the local rock band. The energy was incredible!",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop&crop=center",
      duration: "15:32",
      views: "18.7K",
      likes: "2.1K",
      dislikes: "89",
      comments: "345",
      author: "Emma Davis",
      authorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      category: "music",
      uploadDate: "5 days ago",
      isLiked: false,
      isDisliked: false,
    },
    {
      id: 5,
      title: "Basketball Game Highlights",
      description:
        "Best plays from last night's basketball game. Some incredible shots and teamwork!",
      thumbnail:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop&crop=center",
      duration: "6:47",
      views: "9.2K",
      likes: "678",
      dislikes: "34",
      comments: "123",
      author: "Tom Brown",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      category: "sports",
      uploadDate: "1 day ago",
      isLiked: true,
      isDisliked: false,
    },
    {
      id: 6,
      title: "Travel Vlog: Exploring Japan",
      description:
        "Amazing journey through Japan's beautiful landscapes and vibrant cities.",
      thumbnail:
        "https://images.unsplash.com/photo-1480796927426-f609f6a5d57f?w=400&h=225&fit=crop&crop=center",
      duration: "22:15",
      views: "31.8K",
      likes: "4.2K",
      dislikes: "123",
      comments: "789",
      author: "Lisa Anderson",
      authorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      category: "trending",
      uploadDate: "4 days ago",
      isLiked: false,
      isDisliked: false,
    },
  ];

  const filteredVideos = mockVideos.filter(
    (video) =>
      (selectedCategory === "all" || video.category === selectedCategory) &&
      (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleLike = (videoId: string) => {
    // Handle like logic
    console.log("Liking video:", videoId);
  };

  const handleDislike = (videoId: string) => {
    // Handle dislike logic
    console.log("Disliking video:", videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
                <p className="text-gray-600 mt-2">
                  Discover and watch amazing videos from your network
                </p>
              </div>
              <div className="flex items-center space-x-3">
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
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Video Thumbnail */}
                <div className="relative group cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="h-8 w-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src={video.authorAvatar}
                      alt={video.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600">{video.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                        <Clock className="h-3 w-3" />
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleLike(video.id.toString())}
                        className={`p-2 rounded-lg transition-colors ${
                          video.isLiked
                            ? "text-red-600 bg-red-50"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ThumbsUp
                          className={`h-4 w-4 ${
                            video.isLiked ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <span className="text-xs text-gray-600 mr-2">
                        {video.likes}
                      </span>

                      <button
                        onClick={() => handleDislike(video.id.toString())}
                        className={`p-2 rounded-lg transition-colors ${
                          video.isDisliked
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ThumbsDown
                          className={`h-4 w-4 ${
                            video.isDisliked ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <span className="text-xs text-gray-600 mr-2">
                        {video.dislikes}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Play className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No videos found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filters
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
