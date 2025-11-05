import { Link } from "react-router-dom";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type?: "primary" | "secondary";
}

function Button({
  children,
  disabled = false,
  to,
  type = "primary",
}: ButtonProps) {
  // Base styles
  const baseStyles = "btn px-4 py-2 fs-5 rounded-pill border";

  // Primary button styles
  const primaryStyles = "text-white";
  const primaryStyleObj: React.CSSProperties = {
    backgroundColor: "#EF9B28",
    borderColor: "#EF9B28",
  };

  const primaryHover = {
    backgroundColor: "#cd8521ff",
    borderColor: "#cd8521ff",
  };

  // Secondary button styles
  const secondaryStyles = "text-dark border-dark";
  const secondaryStyleObj: React.CSSProperties = {
    backgroundColor: "transparent",
  };

  const secondaryHover = {
    backgroundColor: "#f0f0f0",
  };

  // Compute styles
  const className = clsx(
    baseStyles,
    type === "secondary" ? secondaryStyles : primaryStyles
  );

  const style = type === "secondary" ? secondaryStyleObj : primaryStyleObj;
  const hoverStyle = type === "secondary" ? secondaryHover : primaryHover;

  // Button rendering
  const ButtonContent = (
    <span
      className={className}
      style={style}
      onMouseEnter={(e) => {
        Object.assign((e.currentTarget as HTMLElement).style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign((e.currentTarget as HTMLElement).style, style);
      }}
    >
      {children}
    </span>
  );

  if (to) {
    return <Link to={to}>{ButtonContent}</Link>;
  }

  return (
    <button disabled={disabled} style={style} className={className}>
      {children}
    </button>
  );
}

export default Button;
