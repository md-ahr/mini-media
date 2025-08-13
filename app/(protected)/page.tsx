"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Smile,
  Users,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for demonstration
const mockStories = [
  {
    id: 1,
    username: "John Doe",
    avatar: "/avatars/john.jpg",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: 2,
    username: "Jane Smith",
    avatar: "/avatars/jane.jpg",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: 3,
    username: "Mike Johnson",
    avatar: "/avatars/mike.jpg",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: 4,
    username: "Sarah Wilson",
    avatar: "/avatars/sarah.jpg",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: 5,
    username: "Tom Brown",
    avatar: "/avatars/tom.jpg",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
  },
  {
    id: 6,
    username: "Emma Davis",
    avatar: "/avatars/emma.jpg",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center",
  },
];

const mockPosts = [
  {
    id: 1,
    username: "John Doe",
    avatar: "/avatars/john.jpg",
    content:
      "Just finished an amazing hike! The views were absolutely breathtaking. Nature never fails to amaze me. 🌲🏔️ #Hiking #Nature #Adventure",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    likes: 42,
    comments: 8,
    shares: 3,
    timeAgo: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    username: "Jane Smith",
    avatar: "/avatars/jane.jpg",
    content:
      "Working on some exciting new projects today! Can't wait to share the results with you all. 💻✨ #Coding #Innovation #Tech",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center",
    likes: 28,
    comments: 12,
    shares: 5,
    timeAgo: "4 hours ago",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    username: "Mike Johnson",
    avatar: "/avatars/mike.jpg",
    content:
      "Coffee and good music - the perfect combination for a productive morning! ☕🎵 What's your morning routine?",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
    likes: 35,
    comments: 15,
    shares: 2,
    timeAgo: "6 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    username: "Sarah Wilson",
    avatar: "/avatars/sarah.jpg",
    content:
      "Beautiful sunset at the beach today! The colors were absolutely magical. 🌅 #Sunset #Beach #Photography",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
    likes: 52,
    comments: 18,
    shares: 7,
    timeAgo: "8 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 5,
    username: "Tom Brown",
    avatar: "/avatars/tom.jpg",
    content:
      "Just completed my first marathon! 26.2 miles of pure determination and grit. 🏃‍♂️💪 #Marathon #Fitness #Achievement",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
    likes: 89,
    comments: 24,
    shares: 12,
    timeAgo: "12 hours ago",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 6,
    username: "Emma Davis",
    avatar: "/avatars/emma.jpg",
    content:
      "New recipe experiment: Homemade sourdough bread! The smell in the house is absolutely divine. 🍞👩‍🍳 #Baking #Sourdough #Homemade",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop&crop=center",
    likes: 67,
    comments: 31,
    shares: 9,
    timeAgo: "1 day ago",
    isLiked: false,
    isBookmarked: true,
  },
];

export default function Home() {
  const [posts, setPosts] = useState(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("friends");

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: Date.now(),
        username: "Current User",
        avatar: "/avatars/current-user.jpg",
        content: newPostContent,
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center",
        likes: 0,
        comments: 0,
        shares: 0,
        timeAgo: "Just now",
        isLiked: false,
        isBookmarked: false,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setShowCreatePost(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const storyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Create Post Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"
        >
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <button
                onClick={() => setShowCreatePost(true)}
                className="w-full text-left p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                What's on your mind?
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex space-x-2 sm:space-x-4">
              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100">
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm hidden sm:block">
                  Photo
                </span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100">
                <Video className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm hidden sm:block">
                  Video
                </span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100">
                <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm hidden sm:block">
                  Feeling
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreatePost(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Create Post
                    </h3>
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">Current User</p>
                      <button className="flex items-center space-x-1 text-sm text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors duration-200">
                        <Users className="h-3 w-3" />
                        <span>
                          {selectedPrivacy === "friends" ? "Friends" : "Public"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[120px] border-0 text-lg resize-none focus:ring-0 focus:outline-none"
                  />

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <Video className="h-5 w-5 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <Smile className="h-5 w-5 text-yellow-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </button>
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stories Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 px-2">
            Stories
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide px-2">
            {mockStories.map((story, index) => (
              <motion.div
                key={story.id}
                variants={storyVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={story.image}
                          alt={story.username}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to avatar initials if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center hidden">
                          <span className="text-sm font-medium text-gray-600">
                            {story.username.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2 max-w-20 truncate px-1">
                    {story.username}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Posts Feed */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                        {post.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {post.username}
                      </p>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-900 leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt="Post"
                      width={600}
                      height={400}
                      className="w-full h-100 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-xs sm:text-sm">
                      {post.likes} likes
                    </span>
                    <span className="text-xs sm:text-sm">
                      {post.comments} comments
                    </span>
                    <span className="text-xs sm:text-sm">
                      {post.shares} shares
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                        post.isLiked
                          ? "text-red-600 bg-red-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span className="hidden sm:block">Like</span>
                    </button>

                    <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 text-xs sm:text-sm">
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:block">Comment</span>
                    </button>

                    <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 text-xs sm:text-sm">
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:block">Share</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                        post.isBookmarked
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          post.isBookmarked ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
