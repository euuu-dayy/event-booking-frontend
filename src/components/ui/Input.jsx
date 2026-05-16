const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-zinc-400">{label}</label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-2xl
          bg-card
          border
          border-zinc-800
          focus:border-gold
          focus:outline-none
          text-white
          placeholder:text-zinc-600
          transition-all
          duration-300
        "
      />
    </div>
  );
};

export default Input;
