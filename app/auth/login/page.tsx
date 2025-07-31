"use client";

import { login } from "@/actions";
import { FormField } from "@/components/common/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ButtonLoader } from "@/components/ui/loader";
import { LoginFormData, loginSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { Github, Mail as Gmail, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      router.push("/");
      toast.success(result.message);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="mx-auto w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-md border border-white/20">
        <CardHeader className="space-y-3 pb-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CardTitle className="text-2xl font-semibold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </motion.div>

          <Form {...form}>
            <motion.form
              variants={containerVariants as Variants | undefined}
              initial="hidden"
              animate="visible"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <motion.div variants={itemVariants as Variants | undefined}>
                <FormField
                  control={form.control}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  icon={Mail}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants as Variants | undefined}>
                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={Lock}
                  showPasswordToggle
                  required
                />
              </motion.div>

              <motion.div
                variants={itemVariants as Variants | undefined}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                  aria-label="Forgot password"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants as Variants | undefined}>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <ButtonLoader size="sm" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                aria-label="Sign up"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
