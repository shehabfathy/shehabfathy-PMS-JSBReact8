import { ClipLoader } from "react-spinners";
import type { CSSProperties } from "react";

type SpinnerProps = {
  size?: number; // Optional, default value provided
  color?: string; // Optional color
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Spinner({ size = 40, color = "#ffffff" }: SpinnerProps) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
