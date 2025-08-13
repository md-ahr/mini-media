"use client";

import { logout } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  HelpCircle,
  Home,
  Image as ImageIcon,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  User,
  Users,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

type UserType = {
  username: string;
  email: string;
  avatar?: string;
} | null;

type ApiResponse<T = UserType | null> = {
  success: boolean;
  message: string;
  data: T | null;
};

interface HeaderProps {
  userPromise: Promise<ApiResponse<UserType>>;
}

export function Header({ userPromise }: HeaderProps) {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userData = use(userPromise);

  const user = userData.data;

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      router.push("/auth/login");
    }
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: Home, active: true },
    { href: "/videos", label: "Videos", icon: Video },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/photos", label: "Photos", icon: ImageIcon },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-[90%] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-gray-900">
                Mini Social
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-xs ml-6">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, friends, groups, etc."
                  className="w-full pl-12 pr-4 py-3 text-sm bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Center Section - Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-center w-16 h-12 rounded-lg transition-all duration-200 relative group ${
                  item.active
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-6 w-6" />
                {item.active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <Bell className="size-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0" forceMount>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    Notifications
                  </span>
                  <Link
                    href="/"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          Sarah liked your photo
                        </p>
                        <p className="text-xs text-gray-500">2 min ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          Mike sent you a friend request
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          Your album &quot;Vacation 2024&quot; was updated
                        </p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <MessageCircle className="size-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 p-0" forceMount>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Messages</span>
                  <Link
                    href="/messages"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Open inbox
                  </Link>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <Link
                    href="/messages"
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback className="bg-blue-600 text-white">
                          S
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Sarah Wilson
                          </p>
                          <p className="text-xs text-gray-500">2m</p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          Hey! How&apos;s the new project going?
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/messages"
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback className="bg-indigo-600 text-white">
                          M
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Mike Johnson
                          </p>
                          <p className="text-xs text-gray-500">1h</p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          Thanks for the help yesterday!
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/messages"
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback className="bg-purple-600 text-white">
                          E
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Emma Davis
                          </p>
                          <p className="text-xs text-gray-500">3h</p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          Are you free for a quick call?
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full hover:bg-gray-100 transition-all duration-200 p-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.avatar}
                      alt={user?.username || "User"}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                      {user?.username?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.username || "User"}
                      />
                      <AvatarFallback className="bg-blue-600 text-white text-lg font-medium">
                        {user?.username?.charAt(0).toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user?.username || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center p-3 cursor-pointer"
                  >
                    <User className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Profile</p>
                      <p className="text-xs text-muted-foreground">
                        View your profile
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex items-center p-3 cursor-pointer"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-muted-foreground">
                        Manage your account
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/support"
                    className="flex items-center p-3 cursor-pointer"
                  >
                    <HelpCircle className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Help & Support</p>
                      <p className="text-xs text-muted-foreground">
                        Get help and FAQs
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 p-3 cursor-pointer"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <div>
                    <p className="font-medium">Log out</p>
                    <p className="text-xs text-muted-foreground">
                      Sign out of your account
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-3">
                {/* Mobile Search */}
                <div className="px-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Mini Social"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="grid grid-cols-4 gap-2 px-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200 ${
                        item.active
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`h-6 w-6 ${
                          item.active ? "text-blue-600" : ""
                        }`}
                      />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="border-t border-gray-200 pt-3 px-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Friends
                    </Button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/support"
                      className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <HelpCircle className="h-5 w-5" />
                      <span>Help & Support</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
