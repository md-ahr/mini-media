"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Filter,
  Heart,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Mock event categories
  const categories = [
    { id: "all", label: "All Events", count: 24 },
    { id: "upcoming", label: "Upcoming", count: 12 },
    { id: "today", label: "Today", count: 3 },
    { id: "this-week", label: "This Week", count: 8 },
    { id: "music", label: "Music", count: 6 },
    { id: "sports", label: "Sports", count: 4 },
    { id: "business", label: "Business", count: 3 },
    { id: "social", label: "Social", count: 5 },
  ];

  // Mock events data
  const mockEvents = [
    {
      id: "1",
      title: "Summer Music Festival",
      description:
        "Join us for an amazing day of live music, food, and fun! Featuring local bands and artists.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      category: "music",
      date: "2024-07-15",
      time: "2:00 PM - 10:00 PM",
      location: "Central Park, New York",
      organizer: "Music Events Co.",
      organizerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      attendees: 156,
      maxAttendees: 200,
      price: "$25",
      isFree: false,
      isAttending: false,
      isSaved: true,
      tags: ["Live Music", "Outdoor", "Family Friendly"],
    },
    {
      id: "2",
      title: "Tech Startup Meetup",
      description:
        "Network with fellow entrepreneurs and learn about the latest trends in technology and business.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
      category: "business",
      date: "2024-06-28",
      time: "6:00 PM - 9:00 PM",
      location: "Innovation Hub, San Francisco",
      organizer: "Tech Community",
      organizerAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      attendees: 89,
      maxAttendees: 100,
      price: "Free",
      isFree: true,
      isAttending: true,
      isSaved: false,
      tags: ["Networking", "Technology", "Startups"],
    },
    {
      id: "3",
      title: "Basketball Tournament",
      description:
        "Annual community basketball tournament for all skill levels. Prizes for winners!",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop&crop=center",
      category: "sports",
      date: "2024-06-30",
      time: "9:00 AM - 6:00 PM",
      location: "Community Sports Center",
      organizer: "Sports League",
      organizerAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      attendees: 45,
      maxAttendees: 64,
      price: "$15",
      isFree: false,
      isAttending: false,
      isSaved: true,
      tags: ["Basketball", "Tournament", "Community"],
    },
    {
      id: "4",
      title: "Art Gallery Opening",
      description:
        "Exclusive opening night for our new contemporary art exhibition. Wine and appetizers included.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      category: "social",
      date: "2024-07-02",
      time: "7:00 PM - 10:00 PM",
      location: "Modern Art Gallery",
      organizer: "Art Collective",
      organizerAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      attendees: 67,
      maxAttendees: 80,
      price: "$40",
      isFree: false,
      isAttending: false,
      isSaved: false,
      tags: ["Art", "Exhibition", "Networking"],
    },
    {
      id: "5",
      title: "Yoga in the Park",
      description:
        "Free outdoor yoga session for all levels. Bring your own mat and enjoy nature!",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center",
      category: "social",
      date: "2024-06-29",
      time: "8:00 AM - 9:00 AM",
      location: "Riverside Park",
      organizer: "Wellness Community",
      organizerAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      attendees: 23,
      maxAttendees: 50,
      price: "Free",
      isFree: true,
      isAttending: true,
      isSaved: true,
      tags: ["Yoga", "Outdoor", "Wellness"],
    },
    {
      id: "6",
      title: "Food Truck Festival",
      description:
        "A celebration of local cuisine with food trucks, live music, and family activities.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
      category: "social",
      date: "2024-07-06",
      time: "12:00 PM - 8:00 PM",
      location: "Downtown Plaza",
      organizer: "Food Festival Co.",
      organizerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      attendees: 234,
      maxAttendees: 500,
      price: "$10",
      isFree: false,
      isAttending: false,
      isSaved: false,
      tags: ["Food", "Music", "Family"],
    },
  ];

  const filteredEvents = mockEvents.filter(
    (event) =>
      (selectedCategory === "all" || event.category === selectedCategory) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleAttend = (eventId: string) => {
    // Handle attend logic
    console.log("Attending event:", eventId);
  };

  const handleSave = (eventId: string) => {
    // Handle save logic
    console.log("Saving event:", eventId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
                <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                <p className="text-gray-600 mt-2">
                  Discover and join amazing events in your area
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowCreateEvent(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
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
                  placeholder="Search events..."
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

          {/* Events Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Event Image */}
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className={`${
                        event.isFree
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {event.isFree ? "Free" : event.price}
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
                      {event.attendees}/{event.maxAttendees}
                    </Badge>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(event.date)} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={event.organizerAvatar}
                        alt={event.organizer}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm">
                        {event.organizer.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {event.organizer}
                      </p>
                      <p className="text-xs text-gray-500">Organizer</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      variant={event.isAttending ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => handleAttend(event.id)}
                    >
                      {event.isAttending ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Attending
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Attend
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant={event.isSaved ? "default" : "outline"}
                      onClick={() => handleSave(event.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          event.isSaved ? "fill-current" : ""
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
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filters
              </p>
            </motion.div>
          )}

          {/* Create Event Modal */}
          <AnimatePresence>
            {showCreateEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreateEvent(false)}
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
                        Create New Event
                      </h3>
                      <button
                        onClick={() => setShowCreateEvent(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="h-5 w-5 transform rotate-45" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Title
                        </label>
                        <Input placeholder="Enter event title" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your event..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <Input type="time" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input placeholder="Enter event location" />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Create Event
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateEvent(false)}
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
