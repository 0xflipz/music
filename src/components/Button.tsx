"use client";

import React from "react";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      //@ts-ignore
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-full px-6 py-2 font-medium transition-colors",
          variant === "primary" && "bg-primary text-white hover:bg-primary-dark",
          variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button; 