"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Cookie,
  Download,
  FileText,
  Info,
  Lock,
  Search,
  Shield,
} from "lucide-react";
import { useState } from "react";

export default function CookiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["overview"])
  );

  const [preferences, setPreferences] = useState({
    essential: true, // locked
    analytics: true,
    personalization: true,
    marketing: false,
  });

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedSections(next);
  };

  const handleDownload = () => {
    // Hook up to generate/download PDF if needed
    console.log("Downloading cookie policy...");
  };

  const policySections = [
    {
      id: "overview",
      title: "Overview",
      icon: FileText,
      updated: "2 weeks ago",
      content:
        "This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our site, what these technologies are, why we use them, and your rights to control their use.",
    },
    {
      id: "what-are-cookies",
      title: "What Are Cookies?",
      icon: Cookie,
      updated: "1 month ago",
      content:
        "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.",
    },
    {
      id: "types",
      title: "Types of Cookies We Use",
      icon: Shield,
      updated: "3 weeks ago",
      content:
        "We use essential cookies required for the site to function. We also use performance and analytics cookies to understand how the site is used, personalization cookies to remember your preferences, and marketing cookies to deliver relevant content.",
    },
    {
      id: "how-we-use",
      title: "How We Use Cookies",
      icon: FileText,
      updated: "3 weeks ago",
      content:
        "Cookies help us authenticate users, remember settings, improve site performance, analyze traffic, and personalize your experience. Some cookies are set by third parties for analytics and advertising purposes.",
    },
    {
      id: "third-parties",
      title: "Third‑Party Cookies",
      icon: Shield,
      updated: "1 month ago",
      content:
        "Third‑party cookies may be set by analytics providers, advertising partners, and embedded content (such as videos). We do not control the operation of these cookies. Please refer to the third party's policies for more information.",
    },
    {
      id: "manage",
      title: "Managing Cookies",
      icon: FileText,
      updated: "2 weeks ago",
      content:
        "You can control and manage cookies in your browser settings. You can also adjust your preferences below. Note that disabling essential cookies may impact site functionality.",
    },
    {
      id: "retention",
      title: "Retention & Updates",
      icon: Clock,
      updated: "2 weeks ago",
      content:
        "We retain cookies for varying periods depending on their purpose. We may update this policy from time to time to reflect changes in technology, law, or our operations.",
    },
  ];

  const filteredSections = policySections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Cookie className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cookie Policy
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn how we use cookies and control your preferences
              </p>
            </div>

            {/* Search */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search cookie policy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Manage Cookie Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      Essential Cookies
                    </span>
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Required for core site functionality
                  </p>
                </div>
                <Switch
                  checked
                  disabled
                  aria-readonly
                  aria-label="Essential cookies (required)"
                />
              </div>

              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Analytics Cookies</p>
                  <p className="text-sm text-gray-600">
                    Help us understand site usage
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(v) =>
                    setPreferences((p) => ({ ...p, analytics: !!v }))
                  }
                  aria-label="Enable analytics cookies"
                />
              </div>

              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">
                    Personalization Cookies
                  </p>
                  <p className="text-sm text-gray-600">
                    Remember your settings and preferences
                  </p>
                </div>
                <Switch
                  checked={preferences.personalization}
                  onCheckedChange={(v) =>
                    setPreferences((p) => ({ ...p, personalization: !!v }))
                  }
                  aria-label="Enable personalization cookies"
                />
              </div>

              <div className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">Marketing Cookies</p>
                  <p className="text-sm text-gray-600">
                    Show relevant content and ads
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(v) =>
                    setPreferences((p) => ({ ...p, marketing: !!v }))
                  }
                  aria-label="Enable marketing cookies"
                />
              </div>

              <div className="pt-3">
                <p className="text-xs text-gray-500">
                  You can change your preferences at any time. Some changes may
                  require reloading the page to take effect.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {filteredSections.map((section) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <section.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        {section.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Updated {section.updated}</span>
                      </div>
                    </div>
                  </div>
                  <Info className="h-5 w-5 text-gray-400" />
                </button>

                <AnimatePresence initial={false}>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer note */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  Your preferences are saved for this browser.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
