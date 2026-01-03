import type React from "react";

interface ButtonProps {
  type: "button" | "submit";
  children: React.ReactNode;
}

function Button({ type = "button", children }: ButtonProps) {
  return (
    <button
      className={`rounded-sm border px-4 py-1 ${type === "submit" ? "bg-green-700 text-white" : "bg-white text-black"}`}
      type={type}
    >
      {children}
    </button>
  );
}

export { Button };
