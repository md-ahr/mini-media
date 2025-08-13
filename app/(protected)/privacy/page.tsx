"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Eye,
  Lock,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Privacy() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "friends",
    postVisibility: "friends",
    allowFriendRequests: true,
    allowMessages: true,
    showOnlineStatus: true,
    showLastSeen: false,
    allowTagging: true,
    allowSharing: true,
    dataCollection: {
      analytics: true,
      personalization: true,
      marketing: false,
    },
  });

  // Mock privacy categories
  const privacyCategories = [
    { id: "profile", label: "Profile Privacy", icon: UserCheck },
    { id: "posts", label: "Posts & Content", icon: Eye },
    { id: "interactions", label: "Interactions", icon: Users },
    { id: "data", label: "Data & Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
  ];

  // Mock privacy policy sections
  const privacyPolicySections = [
    {
      id: "data-collection",
      title: "Data Collection",
      description:
        "We collect information you provide directly to us, such as when you create an account, make a post, or contact us.",
      lastUpdated: "2 weeks ago",
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      description:
        "We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure security.",
      lastUpdated: "1 month ago",
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      description:
        "We do not sell your personal information. We may share your information in limited circumstances with your consent or as required by law.",
      lastUpdated: "3 weeks ago",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      description:
        "You have the right to access, correct, or delete your personal information. You can also control your privacy settings at any time.",
      lastUpdated: "1 week ago",
    },
  ];

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleDataCollectionChange = (setting: string, value: boolean) => {
    setPrivacySettings((prev) => ({
      ...prev,
      dataCollection: {
        ...prev.dataCollection,
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleDownloadData = () => {
    // Handle data download
    console.log("Downloading user data...");
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("Initiating account deletion...");
  };

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
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Privacy & Security
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Control your privacy settings, manage your data, and understand
                how we protect your information
              </p>
            </div>
          </div>

          {/* Privacy Categories Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-wrap gap-2">
              {privacyCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Privacy Settings */}
          {activeTab === "profile" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                  Profile Privacy
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Profile Visibility
                      </h3>
                      <p className="text-sm text-gray-600">
                        Who can see your profile
                      </p>
                    </div>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) =>
                        handlePrivacyChange("profileVisibility", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Online Status
                      </h3>
                      <p className="text-sm text-gray-600">
                        Show when you're online
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showOnlineStatus}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("showOnlineStatus", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Last Seen</h3>
                      <p className="text-sm text-gray-600">
                        Show when you were last active
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showLastSeen}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("showLastSeen", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Friend Requests
                      </h3>
                      <p className="text-sm text-gray-600">
                        Allow others to send you friend requests
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.allowFriendRequests}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("allowFriendRequests", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts & Content Privacy */}
          {activeTab === "posts" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Posts & Content Privacy
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Default Post Visibility
                      </h3>
                      <p className="text-sm text-gray-600">
                        Who can see your posts by default
                      </p>
                    </div>
                    <select
                      value={privacySettings.postVisibility}
                      onChange={(e) =>
                        handlePrivacyChange("postVisibility", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Allow Tagging
                      </h3>
                      <p className="text-sm text-gray-600">
                        Let others tag you in posts and photos
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.allowTagging}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("allowTagging", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Allow Sharing
                      </h3>
                      <p className="text-sm text-gray-600">
                        Let others share your posts
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.allowSharing}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("allowSharing", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data & Privacy */}
          {activeTab === "data" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Data & Privacy
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Analytics</h3>
                      <p className="text-sm text-gray-600">
                        Help us improve by sharing usage data
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.dataCollection.analytics}
                      onCheckedChange={(checked) =>
                        handleDataCollectionChange("analytics", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Personalization
                      </h3>
                      <p className="text-sm text-gray-600">
                        Personalize your experience
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.dataCollection.personalization}
                      onCheckedChange={(checked) =>
                        handleDataCollectionChange("personalization", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing</h3>
                      <p className="text-sm text-gray-600">
                        Receive personalized ads and offers
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.dataCollection.marketing}
                      onCheckedChange={(checked) =>
                        handleDataCollectionChange("marketing", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Data Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Data Actions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleDownloadData}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Download className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">Download My Data</span>
                    <span className="text-sm text-gray-600">
                      Get a copy of all your data
                    </span>
                  </Button>

                  <Button
                    onClick={handleDeleteAccount}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-6 w-6" />
                    <span className="font-medium">Delete Account</span>
                    <span className="text-sm text-gray-600">
                      Permanently remove your account
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Policy */}
          {activeTab === "data" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Privacy Policy
              </h3>

              <div className="space-y-4">
                {privacyPolicySections.map((section) => (
                  <motion.div
                    key={section.id}
                    variants={itemVariants}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {section.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Updated {section.lastUpdated}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Save Changes
                </h3>
                <p className="text-sm text-gray-600">
                  Your privacy settings will be updated immediately
                </p>
              </div>
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Settings
              </Button>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSaveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-50 border border-green-200 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">
                    Privacy settings saved successfully!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
