import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  scale?: number;
  fade?: boolean;
}

export function PopUpMotion({ children, delay, className, duration = 0.5, scale = 0.5, fade = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: fade ? 0 : 1, scale: scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: delay, duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
