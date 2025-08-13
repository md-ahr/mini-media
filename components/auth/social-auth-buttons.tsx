"use client";

import { githubLogin, googleLogin } from "@/actions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Mail as Gmail } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SocialAuthButtons() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      router.push("/");
      toast.success(result.message);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await githubLogin();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      router.push("/");
      toast.success(result.message);
    } catch (error) {
      console.error("Github login error:", error);
      toast.error("Github login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 gap-3"
    >
      <Button
        onClick={handleGoogleLogin}
        className="h-12 bg-red-500 hover:bg-red-600 text-white border-2 border-red-500 hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Gmail className="w-5 h-5 mr-2" />
        Gmail
      </Button>

      <Button
        onClick={handleGithubLogin}
        className="h-12 bg-gray-900 hover:bg-gray-800 text-white border-2 border-gray-900 hover:border-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Github className="w-5 h-5 mr-2" />
        GitHub
      </Button>
    </motion.div>
  );
}
