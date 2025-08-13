"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Eye,
  Filter,
  Grid3X3,
  Image as ImageIcon,
  Search,
  Share2,
  Square,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Photos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("photos");
  const [viewMode, setViewMode] = useState("grid");

  // Mock photo categories
  const categories = [
    { id: "all", label: "All Photos", count: 156 },
    { id: "recent", label: "Recent", count: 23 },
    { id: "albums", label: "Albums", count: 8 },
    { id: "favorites", label: "Favorites", count: 34 },
    { id: "people", label: "People", count: 45 },
    { id: "places", label: "Places", count: 28 },
  ];

  // Mock photos data
  const mockPhotos = [
    {
      id: 1,
      title: "Sunset at the Beach",
      description: "Beautiful sunset captured during our beach vacation",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&crop=center",
      likes: 124,
      comments: 23,
      shares: 8,
      author: "John Doe",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      category: "recent",
      uploadDate: "2 hours ago",
      location: "Miami Beach, FL",
      isLiked: false,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Mountain Hiking Adventure",
      description: "Amazing views from the top of the mountain",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
      likes: 89,
      comments: 15,
      shares: 4,
      author: "Sarah Wilson",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      category: "places",
      uploadDate: "1 day ago",
      location: "Rocky Mountains, CO",
      isLiked: true,
      isFavorite: true,
    },
    {
      id: 3,
      title: "City Skyline at Night",
      description: "The city never sleeps - beautiful night photography",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center",
      likes: 234,
      comments: 42,
      shares: 18,
      author: "Mike Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      category: "places",
      uploadDate: "3 days ago",
      location: "New York, NY",
      isLiked: false,
      isFavorite: false,
    },
    {
      id: 4,
      title: "Family Portrait",
      description: "Beautiful family moment captured perfectly",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
      likes: 156,
      comments: 28,
      shares: 12,
      author: "Emma Davis",
      authorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      category: "people",
      uploadDate: "1 week ago",
      location: "Home Studio",
      isLiked: true,
      isFavorite: true,
    },
    {
      id: 5,
      title: "Coffee Art",
      description: "Latte art that's almost too beautiful to drink",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      likes: 78,
      comments: 12,
      shares: 5,
      author: "Tom Brown",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      category: "recent",
      uploadDate: "4 hours ago",
      location: "Local Coffee Shop",
      isLiked: false,
      isFavorite: false,
    },
    {
      id: 6,
      title: "Flower Garden",
      description: "Spring flowers in full bloom",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center",
      likes: 92,
      comments: 18,
      shares: 7,
      author: "Lisa Anderson",
      authorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      category: "favorites",
      uploadDate: "2 days ago",
      location: "Botanical Gardens",
      isLiked: false,
      isFavorite: true,
    },
  ];

  // Mock albums data
  const albums = [
    {
      id: 1,
      title: "Vacation 2024",
      coverImage:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&crop=center",
      photoCount: 24,
      author: "John Doe",
      createdDate: "2 weeks ago",
    },
    {
      id: 2,
      title: "Family Memories",
      coverImage:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
      photoCount: 18,
      author: "Sarah Wilson",
      createdDate: "1 month ago",
    },
    {
      id: 3,
      title: "Food Adventures",
      coverImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center",
      photoCount: 31,
      author: "Mike Johnson",
      createdDate: "3 weeks ago",
    },
  ];

  const filteredPhotos = mockPhotos.filter(
    (photo) =>
      (activeTab === "all" || photo.category === activeTab) &&
      (photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <h1 className="text-3xl font-bold text-gray-900">Photos</h1>
                <p className="text-gray-600 mt-2">
                  Capture and share your precious moments
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Photos
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
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tabs and View Mode */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === category.id
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

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "masonry"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Square className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Albums Section */}
          {activeTab === "albums" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                Photo Albums
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <motion.div
                    key={album.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {album.photoCount} photos
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {album.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>by {album.author}</span>
                        <span>{album.createdDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Photos Grid */}
          {activeTab !== "albums" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                    viewMode === "masonry" ? "h-auto" : "aspect-square"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative group">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className={`w-full object-cover ${
                        viewMode === "masonry" ? "h-auto" : "h-full"
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <Eye className="h-5 w-5 text-gray-900" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <Download className="h-5 w-5 text-gray-900" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <Share2 className="h-5 w-5 text-gray-900" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo Info (only show in masonry view) */}
                  {viewMode === "masonry" && (
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">
                        {photo.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{photo.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{photo.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {filteredPhotos.length === 0 && activeTab !== "albums" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <ImageIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No photos found
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
