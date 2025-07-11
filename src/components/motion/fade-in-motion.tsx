import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  amount?: number;
}

export function FadeInMotion({ children, delay, className, duration = 0.5, amount = 0.5 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: amount }}
      transition={{ delay: delay, duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
