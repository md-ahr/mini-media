"use client";

import { register } from "@/actions";
import { FormField } from "@/components/common/forms";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/ui/loader";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/constants";
import { RegisterFormData, registerSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await register(data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      router.push("/auth/login");
      toast.success(result.message);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
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
            name="username"
            label="Username"
            placeholder="Enter your username"
            icon={User}
            required
          />
        </motion.div>

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
            placeholder="Create a password"
            icon={Lock}
            showPasswordToggle
            required
          />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS as Variants | undefined}>
          <FormField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon={Lock}
            showPasswordToggle
            required
          />
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
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
