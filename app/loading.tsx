"use client";

import { motion } from "framer-motion";

export default function loading() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="bg-blue-600 rounded-sm w-1.5 h-8"
            animate={{
              height: [12, 24, 32],
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
    </div>
  );
}
