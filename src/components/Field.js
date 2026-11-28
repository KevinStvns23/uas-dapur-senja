"use client";
import { useState } from "react";

export default function Field({ label, name, type = "text", error, hint, readOnly, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const id = `field-${name}`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-forest">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && show ? "text" : type}
          readOnly={readOnly}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          className={`w-full rounded-lg border bg-white px-4 py-3 outline-none transition-colors
            placeholder:text-ink/35 focus:border-leaf focus:ring-2 focus:ring-leaf/25
            ${error ? "border-ember" : "border-forest/20"}
            ${readOnly ? "bg-forest/5 text-ink/60" : ""} ${isPassword ? "pr-24" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-medium text-leaf hover:text-forest focus-visible:outline-2 focus-visible:outline-leaf"
          >
            {show ? "Sembunyikan" : "Lihat"}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-ember">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/55">{hint}</p>
      ) : null}
    </div>
  );
}
