import { motion } from "framer-motion";

import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-[-200px]
          w-[500px]
          h-[500px]
          bg-gold/10
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          relative
          z-10
          max-w-5xl
          text-center
        "
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            text-gold
            uppercase
            tracking-[0.3em]
            text-sm
            mb-6
          "
        >
          Premium Event Experience
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            text-white
          "
        >
          Book Luxury
          <span className="text-gold">
            {" "}
            Events
          </span>

          <br />

          With Seamless
          <span className="text-gold">
            {" "}
            Experience
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="
            mt-8
            text-zinc-400
            text-lg
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          Discover concerts,
          premium experiences,
          and VIP events with our
          next-generation booking
          platform.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
          "
        >
          <Button>
            Explore Events
          </Button>

          <button
            className="
              px-6
              py-3
              rounded-2xl
              border
              border-zinc-700
              text-zinc-300
              hover:border-gold
              hover:text-gold
              transition-all
            "
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;