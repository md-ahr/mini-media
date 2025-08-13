"use client";

import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/ui/loader";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/constants";
import { LoginFormData, loginSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "../common/forms";
import { Form } from "../ui/form";

export function LoginForm() {
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
      toast.error("Login failed. Please try again.");
    }
  };

  return (
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
          variants={ITEM_VARIANTS as Variants | undefined}
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

        <motion.div variants={ITEM_VARIANTS as Variants | undefined}>
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
  );
}
