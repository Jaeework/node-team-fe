import { cn } from "../../lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "size-5 border-2",
  md: "size-10 border-4",
  lg: "size-16 border-[6px]",
};

const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={cn(
          "border-primary/20 border-t-primary animate-spin rounded-full",
          sizeMap[size],
          className,
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
