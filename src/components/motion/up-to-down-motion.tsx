import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  reverse?: boolean;
  fade?: boolean;
  amount?: number;
}

export function UpToDownMotion({
  children,
  delay,
  className,
  duration = 0.5,
  reverse = false,
  fade = true,
  amount = 0.5,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: fade ? 0 : 1, y: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: amount }}
      transition={{ delay: delay, duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
