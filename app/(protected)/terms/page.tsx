"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Info,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Terms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["overview"])
  );

  // Mock terms sections
  const termsSections = [
    {
      id: "overview",
      title: "Overview",
      subtitle: "General terms and conditions",
      icon: BookOpen,
      lastUpdated: "1 month ago",
      content: `Welcome to our social media platform. By using our service, you agree to these terms and conditions. These terms govern your use of our platform and any related services.

Our platform is designed to connect people, share content, and build communities. We strive to create a safe and engaging environment for all users.`,
    },
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      subtitle: "Agreement to terms and conditions",
      icon: CheckCircle,
      lastUpdated: "2 weeks ago",
      content: `By accessing or using our platform, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our service.

Your continued use of the platform after any changes to these terms constitutes acceptance of the new terms.`,
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      subtitle: "Account creation and responsibilities",
      icon: Users,
      lastUpdated: "3 weeks ago",
      content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account.

You are responsible for all content posted, shared, or transmitted through your account. You must not share your account credentials with others or allow others to use your account.`,
    },
    {
      id: "content-guidelines",
      title: "Content Guidelines",
      subtitle: "Rules for posting and sharing content",
      icon: FileText,
      lastUpdated: "1 week ago",
      content: `You may not post, share, or transmit content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.

Content must not violate any applicable laws or regulations, infringe on intellectual property rights, or contain personal information of others without consent.`,
    },
    {
      id: "privacy-data",
      title: "Privacy and Data",
      subtitle: "How we handle your information",
      icon: Shield,
      lastUpdated: "2 weeks ago",
      content: `We collect, use, and protect your personal information in accordance with our Privacy Policy. By using our service, you consent to our collection and use of your information as described in our Privacy Policy.

We implement appropriate security measures to protect your data and do not sell your personal information to third parties.`,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      subtitle: "Rights and ownership",
      icon: FileText,
      lastUpdated: "1 month ago",
      content: `Our platform and its content, including but not limited to text, graphics, logos, and software, are protected by intellectual property laws. You retain ownership of content you create and share.

By posting content, you grant us a license to use, display, and distribute your content on our platform.`,
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      subtitle: "Activities not allowed on the platform",
      icon: AlertTriangle,
      lastUpdated: "1 week ago",
      content: `The following activities are strictly prohibited:
• Harassment, bullying, or threatening behavior
• Spam, phishing, or fraudulent activities
• Impersonation of others
• Distribution of malware or harmful code
• Violation of applicable laws or regulations

Violations may result in account suspension or termination.`,
    },
    {
      id: "termination",
      title: "Account Termination",
      subtitle: "When and how accounts may be terminated",
      icon: AlertTriangle,
      lastUpdated: "2 weeks ago",
      content: `We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason we deem appropriate.

Upon termination, your access to the platform will be immediately revoked, and we may delete your account and associated content.`,
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      subtitle: "Limitations of our service",
      icon: Info,
      lastUpdated: "3 weeks ago",
      content: `Our service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.

We are not responsible for any content posted by users or for any damages resulting from the use of our service.`,
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      subtitle: "Our liability limitations",
      icon: Shield,
      lastUpdated: "1 month ago",
      content: `To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

Our total liability for any claims arising from your use of our service shall not exceed the amount you paid for our service in the 12 months preceding the claim.`,
    },
  ];

  const filteredSections = termsSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
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
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Terms of Service
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please read these terms carefully before using our platform.
                These terms govern your use of our service and outline your
                rights and responsibilities.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex justify-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4" />
                <span>Print Version</span>
              </Button>
            </div>
          </div>

          {/* Terms Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredSections.map((section) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <section.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{section.subtitle}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Updated {section.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  {expandedSections.has(section.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 border-t border-gray-100"
                    >
                      <div className="pt-4">
                        <div className="prose prose-gray max-w-none">
                          {section.content
                            .split("\n")
                            .map((paragraph, index) => (
                              <p
                                key={index}
                                className="text-gray-700 mb-3 leading-relaxed"
                              >
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please
              contact our legal team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Legal Department
                </h3>
                <p className="text-sm text-gray-600">legal@example.com</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Support Team</h3>
                <p className="text-sm text-gray-600">support@example.com</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-blue-800 mb-2">
              <Info className="h-5 w-5" />
              <span className="font-medium">Last Updated</span>
            </div>
            <p className="text-blue-700">
              These Terms of Service were last updated on January 15, 2024
            </p>
            <p className="text-sm text-blue-600 mt-2">
              We may update these terms from time to time. We will notify you of
              any material changes.
            </p>
          </motion.div>

          {/* Empty State */}
          {filteredSections.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No terms found
              </h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
