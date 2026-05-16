import Navbar from "../../components/navbar/Navbar";

import HeroSection from "../../components/hero/HeroSection";

import FeaturedEvents from "../../components/event/FeaturedEvents";

const HomePage = () => {
  return (
    <div className="bg-background min-h-screen text-white">
      <Navbar />

      <HeroSection />

      <FeaturedEvents />
    </div>
  );
};

export default HomePage;