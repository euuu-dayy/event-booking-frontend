import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        bg-gradient-to-r
        from-gold
        to-softGold
        text-black
        shadow-lg
        hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;