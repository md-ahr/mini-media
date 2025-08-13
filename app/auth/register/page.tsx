import {
  AuthDivider,
  RegisterForm,
  SocialAuthButtons,
} from "@/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function Register() {
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
              Create your account
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardDescription className="text-center text-gray-600">
              Enter your details below to create your account
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <SocialAuthButtons />

            <AuthDivider />

            <RegisterForm />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                  aria-label="Sign in"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
