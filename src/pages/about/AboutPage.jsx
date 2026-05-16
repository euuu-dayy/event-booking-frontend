import { motion } from "framer-motion";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

const AboutPage = () => {
  const features = [
    {
      title:
        "Pessimistic Locking",

      description:
        "Seats are securely locked during booking to prevent duplicate reservations and concurrency conflicts.",
    },

    {
      title:
        "Premium Booking UX",

      description:
        "Modern luxury-inspired experience with live seat selection, countdown timers, and smooth interactions.",
    },

    {
      title:
        "Transaction Safe",

      description:
        "MongoDB transactions ensure atomic bookings and reliable booking consistency.",
    },

    {
      title:
        "Secure Authentication",

      description:
        "JWT authentication with protected routes and secure booking ownership validation.",
    },
  ];

  const stats = [
    {
      value: "99.9%",

      label:
        "Booking Reliability",
    },

    {
      value: "5 Min",

      label:
        "Smart Seat Lock",
    },

    {
      value: "100%",

      label:
        "Transaction Safe",
    },

    {
      value: "24/7",

      label:
        "Availability",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-white overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-28 px-6">
        {/* Background Glow */}
        <div
          className="
            absolute
            top-[-200px]
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            bg-gold/10
            blur-[180px]
            rounded-full
            pointer-events-none
          "
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
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
            className="text-center"
          >
            <p
              className="
                text-gold
                uppercase
                tracking-[0.4em]
                text-sm
                mb-6
              "
            >
              About LuxSeat
            </p>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                leading-tight
                max-w-5xl
                mx-auto
              "
            >
              Redefining
              {" "}
              <span className="text-gold">
                Premium
              </span>
              {" "}
              Event Booking
            </h1>

            <p
              className="
                max-w-3xl
                mx-auto
                text-zinc-400
                text-lg
                mt-10
                leading-relaxed
              "
            >
              LuxSeat delivers a
              luxury-first event
              booking experience
              powered by secure
              concurrency-safe
              architecture,
              intelligent seat
              locking, and modern
              full-stack engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-16"
          >
            <p
              className="
                text-gold
                uppercase
                tracking-[0.3em]
                text-sm
                mb-4
              "
            >
              Core Features
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              Engineered For
              {" "}
              Modern Booking
            </h2>
          </motion.div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
            "
          >
            {features.map(
              (feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.1,
                  }}
                >
                  <GlassCard className="h-full">
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-gold/10
                        border
                        border-gold/20
                        flex
                        items-center
                        justify-center
                        mb-6
                      "
                    >
                      <div
                        className="
                          w-3
                          h-3
                          rounded-full
                          bg-gold
                        "
                      />
                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        mb-4
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        text-zinc-400
                        leading-relaxed
                      "
                    >
                      {
                        feature.description
                      }
                    </p>
                  </GlassCard>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-10
              "
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <h2
                    className="
                      text-5xl
                      font-bold
                      text-gold
                    "
                  >
                    {stat.value}
                  </h2>

                  <p
                    className="
                      text-zinc-400
                      mt-4
                    "
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-16"
          >
            <p
              className="
                text-gold
                uppercase
                tracking-[0.3em]
                text-sm
                mb-4
              "
            >
              Technology
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              Built With
              {" "}
              Modern Stack
            </h2>
          </motion.div>

          <div
            className="
              flex
              flex-wrap
              gap-5
            "
          >
            {[
              "React + Vite",
              "Tailwind CSS",
              "Framer Motion",
              "Node.js",
              "Express.js",
              "MongoDB",
              "JWT Auth",
              "Mongoose Transactions",
              "Axios",
              "REST APIs",
            ].map((tech) => (
              <div
                key={tech}
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-zinc-300
                  hover:border-gold/30
                  hover:text-gold
                  transition-all
                "
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;