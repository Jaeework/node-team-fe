import type { BadgeProps } from "./Badge.types";
import { cn } from "../../../lib/utils";
import { badgeSizes, badgeColors, badgeRadius } from "./Badge.tokens";

const Badge = ({
  size = "xs",
  color = "primary",
  radius = "full",
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border whitespace-nowrap capitalize",
        badgeColors[color],
        badgeSizes[size],
        badgeRadius[radius],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
