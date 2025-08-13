"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Heart,
  HelpCircle,
  Home,
  Image as ImageIcon,
  MessageCircle,
  Settings,
  Shield,
  User,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

// Mock user data
const currentUser = {
  name: "Current User",
  avatar: "/avatars/current-user.jpg",
  email: "user@example.com",
};

const navigationItems = [
  { href: "/", label: "Home", icon: Home, active: true },
  { href: "/friends", label: "Friends", icon: Users },
  { href: "/groups", label: "Groups", icon: BookOpen },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/videos", label: "Videos", icon: Video },
  { href: "/photos", label: "Photos", icon: ImageIcon },
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

const quickActions = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: HelpCircle },
  { href: "/privacy", label: "Privacy", icon: Shield },
];

export function LeftSidebar() {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 space-y-6"
    >
      {/* User Profile Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-medium">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {currentUser.email}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/profile">
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Navigation
        </h3>

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "text-blue-600 bg-blue-50 border border-blue-200"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${item.active ? "text-blue-600" : ""}`}
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Quick Actions
        </h3>

        <div className="space-y-1">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <action.icon className="h-5 w-5" />
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Recent Activity
        </h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              John Doe liked your post
            </span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New friend request</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Event reminder</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Links */}
      <motion.div
        variants={itemVariants}
        className="text-xs text-gray-500 space-y-2"
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/privacy"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Privacy
          </Link>
          <span>•</span>
          <Link
            href="/terms"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Terms
          </Link>
          <span>•</span>
          <Link
            href="/cookies"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Cookies
          </Link>
        </div>
        <p>© 2024 Mini Social. All rights reserved.</p>
      </motion.div>
    </motion.div>
  );
}
