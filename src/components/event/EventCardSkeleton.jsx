const EventCardSkeleton = () => {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-3xl
        bg-card
        border
        border-white/10
      "
    >
      <div
        className="
          h-[320px]
          bg-zinc-800
        "
      />

      <div className="p-6">
        <div
          className="
            h-4
            bg-zinc-800
            rounded
            mb-4
          "
        />

        <div
          className="
            h-8
            bg-zinc-700
            rounded
            mb-6
          "
        />

        <div
          className="
            h-10
            bg-zinc-800
            rounded
          "
        />
      </div>
    </div>
  );
};

export default EventCardSkeleton;