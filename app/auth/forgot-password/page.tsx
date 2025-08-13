"use client";

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
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/constants";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log("Form data:", data);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Failed to send reset email. Please try again.");
    }
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
              Forgot your password?
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardDescription className="text-center text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <motion.form
              variants={CONTAINER_VARIANTS as Variants | undefined}
              initial="hidden"
              animate="visible"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <motion.div variants={ITEM_VARIANTS as Variants | undefined}>
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

              <motion.div variants={ITEM_VARIANTS as Variants | undefined}>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Sending reset email..."
                    : "Send reset email"}
                </Button>
              </motion.div>
            </motion.form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                aria-label="Back to login"
              >
                Back to login
              </Link>
            </p>
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
