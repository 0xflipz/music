"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowAccent?: boolean;
    variant?: "default" | "neural" | "quantum";
  }
>(({ className, glowAccent, variant = "default", ...props }, ref) => (
  //@ts-ignore
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className={cn(
      "rounded-xl border bg-black/40 backdrop-blur-md shadow-lg",
      glowAccent && "after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-white/20 after:transition-all",
      variant === "neural" && "bg-purple-500/10 border-purple-500/20",
      variant === "quantum" && "bg-cyan-500/10 border-cyan-500/20",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export { Card }; 