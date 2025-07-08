import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  reverse?: boolean;
  fade?: boolean;
}

export function LeftToRightMotion({ children, delay, className, duration = 0.5, reverse = false, fade = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: fade ? 0 : 1, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: delay, duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
