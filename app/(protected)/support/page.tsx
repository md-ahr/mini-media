"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";
import { useState } from "react";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Mock FAQ categories
  const categories = [
    { id: "all", label: "All Topics", count: 25 },
    { id: "account", label: "Account", count: 8 },
    { id: "privacy", label: "Privacy", count: 6 },
    { id: "features", label: "Features", count: 7 },
    { id: "technical", label: "Technical", count: 4 },
  ];

  // Mock FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I change my profile picture?",
      answer:
        "To change your profile picture, go to your profile page and click on the camera icon that appears when you hover over your current picture. You can then upload a new image from your device.",
      category: "account",
      tags: ["profile", "photo", "upload"],
    },
    {
      id: 2,
      question: "How can I make my account private?",
      answer:
        "You can make your account private by going to Settings > Privacy. From there, you can control who can see your posts, profile, and contact information. You can choose between Public, Friends Only, or Private.",
      category: "privacy",
      tags: ["privacy", "security", "settings"],
    },
    {
      id: 3,
      question: "How do I create a new post?",
      answer:
        "To create a new post, click on the 'What's on your mind?' box on your home page. You can add text, photos, videos, and choose your privacy settings before posting.",
      category: "features",
      tags: ["posting", "content", "create"],
    },
    {
      id: 4,
      question: "How do I block someone?",
      answer:
        "To block someone, go to their profile page and click on the three dots menu. Select 'Block' from the options. Blocked users won't be able to see your posts or contact you.",
      category: "privacy",
      tags: ["block", "safety", "privacy"],
    },
    {
      id: 5,
      question: "How can I recover my password?",
      answer:
        "If you've forgotten your password, click on 'Forgot Password?' on the login page. Enter your email address and we'll send you a link to reset your password.",
      category: "account",
      tags: ["password", "recovery", "login"],
    },
    {
      id: 6,
      question: "How do I report inappropriate content?",
      answer:
        "To report inappropriate content, click on the three dots menu on any post and select 'Report'. Choose the reason for reporting and provide additional details if needed.",
      category: "features",
      tags: ["report", "safety", "content"],
    },
  ];

  // Mock help resources
  const helpResources = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn the basics of using our platform",
      type: "guide",
      icon: BookOpen,
      duration: "5 min read",
    },
    {
      id: 2,
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      type: "video",
      icon: Video,
      duration: "10 min watch",
    },
    {
      id: 3,
      title: "Community Guidelines",
      description: "Understand our community standards and rules",
      type: "document",
      icon: FileText,
      duration: "3 min read",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm);
    setShowContactForm(false);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Help & Support
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions, get help with your account, or
                contact our support team
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setShowContactForm(true)}
            >
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Contact Support
              </h3>
              <p className="text-sm text-gray-600">
                Get help from our support team
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600">
                Speak with a representative
              </p>
              <p className="text-sm font-medium text-green-600 mt-2">
                1-800-SUPPORT
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-sm text-gray-600">Send us an email</p>
              <p className="text-sm font-medium text-purple-600 mt-2">
                support@example.com
              </p>
            </motion.div>
          </div>

          {/* Help Resources */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Help Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {helpResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <resource.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Frequently Asked Questions
              </h2>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <h3 className="font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-gray-600 mb-3">{faq.answer}</p>
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form Modal */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowContactForm(false)}
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
                        Contact Support
                      </h3>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronUp className="h-5 w-5 transform rotate-45" />
                      </button>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          rows={4}
                          required
                        />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
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
