"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Calendar,
  Edit3,
  FileText,
  Filter,
  FolderPlus,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";

export default function SavedPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState("all");
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  // Mock collections data
  const collections = [
    { id: "all", name: "All Saved", count: 24, icon: Bookmark },
    { id: "inspiration", name: "Inspiration", count: 8, icon: Heart },
    { id: "recipes", name: "Recipes", count: 6, icon: FileText },
    { id: "travel", name: "Travel", count: 4, icon: ImageIcon },
    { id: "tech", name: "Tech Tips", count: 3, icon: Video },
    { id: "fitness", name: "Fitness", count: 3, icon: Heart },
  ];

  // Mock saved posts data
  const savedPosts = [
    {
      id: 1,
      title: "Amazing Sunset at the Beach",
      content:
        "Beautiful sunset captured during our beach vacation. The colors were absolutely magical!",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center",
      type: "post",
      author: "John Doe",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      collection: "inspiration",
      savedDate: "2 days ago",
      likes: 124,
      comments: 23,
      shares: 8,
    },
    {
      id: 2,
      title: "Cooking Tutorial: Homemade Pizza",
      content:
        "Learn how to make delicious homemade pizza from scratch with simple ingredients.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
      type: "video",
      author: "Sarah Wilson",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      collection: "recipes",
      savedDate: "1 week ago",
      likes: 567,
      comments: 89,
      shares: 45,
    },
    {
      id: 3,
      title: "Gaming Highlights: Epic Win Streak",
      content:
        "Incredible gaming session with 15 wins in a row! Check out these amazing plays.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
      type: "video",
      author: "Mike Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      collection: "tech",
      savedDate: "3 days ago",
      likes: 3.4,
      comments: 567,
      shares: 234,
    },
    {
      id: 4,
      title: "Live Concert: Rock Band Performance",
      content:
        "Amazing live performance from the local rock band. The energy was incredible!",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      type: "video",
      author: "Emma Davis",
      authorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      collection: "inspiration",
      savedDate: "5 days ago",
      likes: 2.1,
      comments: 345,
      shares: 123,
    },
    {
      id: 5,
      title: "Basketball Game Highlights",
      content:
        "Best plays from last night's basketball game. Some incredible shots and teamwork!",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop&crop=center",
      type: "post",
      author: "Tom Brown",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      collection: "fitness",
      savedDate: "1 day ago",
      likes: 678,
      comments: 123,
      shares: 67,
    },
    {
      id: 6,
      title: "Travel Vlog: Exploring Japan",
      content:
        "Amazing journey through Japan's beautiful landscapes and vibrant cities.",
      image:
        "https://images.unsplash.com/photo-1480796927426-f609f6a5d57f?w=400&h=300&fit=crop&crop=center",
      type: "video",
      author: "Lisa Anderson",
      authorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      collection: "travel",
      savedDate: "4 days ago",
      likes: 4.2,
      comments: 789,
      shares: 345,
    },
  ];

  const filteredPosts = savedPosts.filter(
    (post) =>
      (activeCollection === "all" || post.collection === activeCollection) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      // Handle collection creation
      setNewCollectionName("");
      setShowCreateCollection(false);
    }
  };

  const handleRemoveFromSaved = (postId: number) => {
    // Handle remove from saved logic
  };

  const handleMoveToCollection = (postId: number, collectionId: string) => {
    // Handle move to collection logic
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "image":
        return ImageIcon;
      default:
        return FileText;
    }
  };

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toString();
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
                <h1 className="text-3xl font-bold text-gray-900">
                  Saved Posts
                </h1>
                <p className="text-gray-600 mt-2">
                  Access your saved content and organize it into collections
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowCreateCollection(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Collection
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
                  placeholder="Search saved posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Collections */}
            <div className="mt-6 flex flex-wrap gap-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setActiveCollection(collection.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCollection === collection.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <collection.icon className="h-4 w-4" />
                  <span>{collection.name}</span>
                  <Badge variant="secondary">{collection.count}</Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Create Collection Modal */}
          <AnimatePresence>
            {showCreateCollection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreateCollection(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Create New Collection
                  </h3>
                  <Input
                    placeholder="Collection name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleCreateCollection}
                      disabled={!newCollectionName.trim()}
                      className="flex-1"
                    >
                      Create
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateCollection(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Saved Posts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Post Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className="bg-black/70 text-white"
                    >
                      {(() => {
                        const TypeIcon = getTypeIcon(post.type);
                        return <TypeIcon className="h-3 w-3 mr-1" />;
                      })()}
                      {post.type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="p-2 bg-black/70 text-white rounded-full hover:bg-black transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                        <Calendar className="h-3 w-3" />
                        <span>{post.savedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span>{formatLikes(post.likes)} likes</span>
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Collection Management */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {
                          collections.find((c) => c.id === post.collection)
                            ?.name
                        }
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() =>
                          handleMoveToCollection(post.id, "inspiration")
                        }
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Move to collection"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromSaved(post.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Bookmark className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No saved posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or collection filters
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
