"use client";

import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { AlertTriangle, Bug, Home, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const pulseVariants: Variants | undefined = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const shakeVariants: Variants | undefined = {
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: 3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-100/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={pulseVariants as Variants | undefined}
          animate="animate"
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={pulseVariants as Variants | undefined}
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-tr from-yellow-400/20 to-red-500/20 rounded-full blur-2xl"
        />
        <motion.div
          variants={pulseVariants as Variants | undefined}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              variants={shakeVariants as Variants | undefined}
              animate="animate"
              className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-2xl"
            >
              <AlertTriangle className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We encountered an unexpected error. Our team has been notified and
              is working to fix it.
            </p>
          </motion.div>

          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Error Details (Development)
                </span>
              </div>
              <p className="text-sm text-red-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-8 py-3 rounded-lg transition-all duration-300 hover:bg-red-50"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg max-w-md mx-auto"
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Need help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If this problem persists, here are some things you can try:
            </p>
            <div className="space-y-2 text-left">
              {[
                "Refresh the page",
                "Clear your browser cache",
                "Check your internet connection",
                "Contact support if the issue continues",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Our team has been notified
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
