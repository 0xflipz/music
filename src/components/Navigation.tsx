"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/utils';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'GANG', href: '/gang' },
    { name: 'TOKENOMICS', href: '/tokenomics' },
    { name: 'M.A.O', href: '/mao' },
    { name: 'SUBMIT YOUR MUSIC', href: '/submit' },
  ];

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link 
            key={item.href}
            href={item.href}
          >
            <motion.div
              className={cn(
                "neon-tab-button relative px-6 py-2.5 rounded-sm",
                "font-mono text-sm tracking-wider overflow-hidden",
                isActive ? "neon-tab-active" : "neon-tab-inactive"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10">{item.name}</div>
              
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-white/5 to-red-500/10" />
              
              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/20 via-white/10 to-red-500/20" />
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-white to-red-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation; 