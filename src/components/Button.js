export default function Button({ loading, children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-ember text-white hover:bg-[#bf4a08] focus-visible:outline-forest",
    green: "bg-leaf text-white hover:bg-forest focus-visible:outline-ember",
    ghost: "border border-forest/25 text-forest hover:bg-forest/5 focus-visible:outline-leaf",
  };
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold transition-colors
        focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed
        ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? "Memproses..." : children}
    </button>
  );
}
