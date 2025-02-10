import { motion } from "framer-motion";
import { cn } from "@/utils/utils";

export const SwipeIndicator = () => (
  <div className={cn(
    "absolute left-4 top-1/2 items-center text-gray-400 text-sm opacity-70",
    "hidden md:hidden", // Hide on desktop
    "max-[768px]:flex", // Show only on mobile
  )}>
    <motion.span
      className="mr-2"
      animate={{
        x: [-10, 0, -10]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      ←
    </motion.span>
    Swipe to close
  </div>
);

export default SwipeIndicator; 