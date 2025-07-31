import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "wave" | "ripple";
  className?: string;
  text?: string;
}

export function Loader({
  size = "md",
  variant = "spinner",
  className,
  text,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderSpinner = () => (
    <motion.div
      className={cn(
        "border-2 border-gray-200 border-t-blue-600 rounded-full",
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const renderDots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-blue-600 rounded-full",
            size === "sm"
              ? "w-1.5 h-1.5"
              : size === "md"
              ? "w-2 h-2"
              : "w-3 h-3"
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn("bg-blue-600 rounded-full", sizeClasses[size], className)}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  const renderWave = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-blue-600 rounded-sm",
            size === "sm"
              ? "w-0.5 h-3"
              : size === "md"
              ? "w-1 h-6"
              : "w-1.5 h-8"
          )}
          animate={{
            height: [
              size === "sm" ? 12 : size === "md" ? 24 : 32,
              size === "sm" ? 6 : size === "md" ? 12 : 16,
              size === "sm" ? 12 : size === "md" ? 24 : 32,
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderRipple = () => (
    <div className={cn("relative", sizeClasses[size], className)}>
      <motion.div
        className="absolute inset-0 border-2 border-blue-600 rounded-full"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [1, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-blue-600 rounded-full"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [1, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeOut",
        }}
      />
      <div
        className={cn(
          "absolute inset-0 bg-blue-600 rounded-full",
          size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
        )}
      />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "wave":
        return renderWave();
      case "ripple":
        return renderRipple();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <motion.p
          className={cn("text-gray-600 font-medium", textSizeClasses[size])}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <motion.div
      className={cn(
        "border-2 border-white border-t-transparent rounded-full",
        size === "sm" ? "w-4 h-4" : "w-5 h-5"
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <motion.div
          className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <motion.div
          className="w-12 h-12 bg-gray-200 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="space-y-2 flex-1">
          <motion.div
            className="h-4 bg-gray-200 rounded w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="h-3 bg-gray-200 rounded w-1/2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <motion.div
        className="h-20 bg-gray-200 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
