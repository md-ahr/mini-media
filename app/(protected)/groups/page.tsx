"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Filter,
  Globe,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Groups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Mock group categories
  const categories = [
    { id: "all", label: "All Groups", count: 45 },
    { id: "my-groups", label: "My Groups", count: 8 },
    { id: "technology", label: "Technology", count: 12 },
    { id: "business", label: "Business", count: 9 },
    { id: "sports", label: "Sports", count: 6 },
    { id: "music", label: "Music", count: 4 },
    { id: "travel", label: "Travel", count: 3 },
    { id: "education", label: "Education", count: 7 },
  ];

  // Mock groups data
  const groups = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      description:
        "A community for technology lovers to discuss the latest trends, share knowledge, and network with fellow tech professionals.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
      category: "technology",
      privacy: "public",
      members: 1247,
      posts: 89,
      lastActive: "2 hours ago",
      organizer: "Tech Community",
      organizerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isMember: true,
      isAdmin: false,
      isSaved: true,
      tags: ["Technology", "Networking", "Professional"],
      location: "Worldwide",
      createdDate: "2 years ago",
    },
    {
      id: 2,
      name: "Startup Founders Network",
      description:
        "Connect with fellow entrepreneurs, share experiences, and get advice on building successful startups.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      category: "business",
      privacy: "private",
      members: 456,
      posts: 34,
      lastActive: "1 day ago",
      organizer: "Startup Hub",
      organizerAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      isMember: true,
      isAdmin: true,
      isSaved: false,
      tags: ["Startups", "Entrepreneurship", "Business"],
      location: "San Francisco, CA",
      createdDate: "1 year ago",
    },
    {
      id: 3,
      name: "Photography Lovers",
      description:
        "Share your best shots, get feedback, and learn new techniques from fellow photography enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      category: "education",
      privacy: "public",
      members: 892,
      posts: 156,
      lastActive: "30 minutes ago",
      organizer: "Photo Collective",
      organizerAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      isMember: false,
      isAdmin: false,
      isSaved: true,
      tags: ["Photography", "Art", "Learning"],
      location: "Global",
      createdDate: "3 years ago",
    },
    {
      id: 4,
      name: "Fitness & Wellness",
      description:
        "A supportive community for fitness enthusiasts to share workout routines, nutrition tips, and motivation.",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop&crop=center",
      category: "sports",
      privacy: "public",
      members: 2341,
      posts: 234,
      lastActive: "1 hour ago",
      organizer: "Wellness Community",
      organizerAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      isMember: true,
      isAdmin: false,
      isSaved: false,
      tags: ["Fitness", "Wellness", "Health"],
      location: "Worldwide",
      createdDate: "4 years ago",
    },
    {
      id: 5,
      name: "Book Club",
      description:
        "Monthly book discussions, reading recommendations, and literary conversations for book lovers.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center",
      category: "education",
      privacy: "private",
      members: 123,
      posts: 45,
      lastActive: "3 days ago",
      organizer: "Literary Society",
      organizerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isMember: false,
      isAdmin: false,
      isSaved: true,
      tags: ["Books", "Literature", "Discussion"],
      location: "Online",
      createdDate: "6 months ago",
    },
    {
      id: 6,
      name: "Travel Adventures",
      description:
        "Share travel stories, tips, and photos from around the world. Connect with fellow travelers and plan your next adventure.",
      image:
        "https://images.unsplash.com/photo-1480796927426-f609f6a5d57f?w=400&h=300&fit=crop&crop=center",
      category: "travel",
      privacy: "public",
      members: 567,
      posts: 89,
      lastActive: "5 hours ago",
      organizer: "Travel Community",
      organizerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isMember: true,
      isAdmin: false,
      isSaved: false,
      tags: ["Travel", "Adventure", "Photography"],
      location: "Global",
      createdDate: "2 years ago",
    },
  ];

  const filteredGroups = groups.filter(
    (group) =>
      (activeCategory === "all" || group.category === activeCategory) &&
      (group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.location.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleJoinGroup = (groupId: number) => {
    // Handle join group logic
  };

  const handleSaveGroup = (groupId: number) => {
    // Handle save group logic
  };

  const getPrivacyIcon = (privacy: string) => {
    return privacy === "private" ? Lock : Globe;
  };

  const getPrivacyColor = (privacy: string) => {
    return privacy === "private" ? "text-orange-600" : "text-green-600";
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
                <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
                <p className="text-gray-600 mt-2">
                  Join communities, share interests, and connect with
                  like-minded people
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowCreateGroup(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
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
                  placeholder="Search groups..."
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
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
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

          {/* Groups Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Group Image */}
                <div className="relative">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className={`${getPrivacyColor(
                        group.privacy
                      )} bg-white/90`}
                    >
                      <getPrivacyIcon
                        privacy={group.privacy}
                        className="h-3 w-3 mr-1"
                      />
                      {group.privacy}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="p-2 bg-black/70 text-white rounded-full hover:bg-black transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge
                      variant="secondary"
                      className="bg-black/70 text-white"
                    >
                      {group.members} members
                    </Badge>
                  </div>
                </div>

                {/* Group Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Group Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {group.members.toLocaleString()} members • {group.posts}{" "}
                        posts
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{group.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Created {group.createdDate} • Last active{" "}
                        {group.lastActive}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={group.organizerAvatar}
                        alt={group.organizer}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm">
                        {group.organizer.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {group.organizer}
                      </p>
                      <p className="text-xs text-gray-500">Organizer</p>
                    </div>
                    {group.isAdmin && (
                      <Badge variant="outline" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                    {group.isMember ? (
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Group
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant={group.isSaved ? "default" : "outline"}
                      onClick={() => handleSaveGroup(group.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          group.isSaved ? "fill-current" : ""
                        }`}
                      />
                    </Button>

                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredGroups.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No groups found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filters
              </p>
            </motion.div>
          )}

          {/* Create Group Modal */}
          <AnimatePresence>
            {showCreateGroup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreateGroup(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Create New Group
                      </h3>
                      <button
                        onClick={() => setShowCreateGroup(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="h-5 w-5 transform rotate-45" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Group Name
                        </label>
                        <Input placeholder="Enter group name" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your group..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Technology</option>
                            <option>Business</option>
                            <option>Sports</option>
                            <option>Music</option>
                            <option>Travel</option>
                            <option>Education</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Privacy
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Public</option>
                            <option>Private</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input placeholder="Enter group location" />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Create Group
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateGroup(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
