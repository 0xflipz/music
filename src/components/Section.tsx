import { cn } from "@/utils/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={cn(
      // Base styles
      "w-full max-w-[1800px] mx-auto px-4",
      // Mobile styles
      "py-4",
      // Desktop styles
      "md:py-8 md:px-8",
      // Custom classes
      className
    )}>
      {children}
    </section>
  );
};

export default Section; 