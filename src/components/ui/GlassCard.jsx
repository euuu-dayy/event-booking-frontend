import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;