import { cn } from "../../../lib/utils";
import {
  tooltipArrowDirections,
  tooltipArrowPositions,
  tooltipPositions,
  tooltipSizes,
  tooltipVariants,
} from "./Tooltip.tokens";
import type { TooltipProps } from "./Tooltip.types";

const Tooltip = ({
  message,
  position = "top",
  arrowPosition = "center",
  variant = "ink",
  size = "md",
  className,
}: TooltipProps) => {
  const variantStyle = tooltipVariants[variant];

  const arrowColorStyle = {
    top: { borderTopColor: variantStyle.arrow },
    bottom: { borderBottomColor: variantStyle.arrow },
    left: { borderLeftColor: variantStyle.arrow },
    right: { borderRightColor: variantStyle.arrow },
  };

  return (
    <div
      role="tooltip"
      className={cn(
        "absolute z-10 w-max",
        tooltipPositions[position],
        className,
      )}
    >
      <div
        className={cn(
          "absolute h-0 w-0",
          tooltipArrowPositions[arrowPosition],
          tooltipArrowDirections[position],
        )}
        style={arrowColorStyle[position]}
      />
      <div
        className={cn(
          "rounded-md text-center whitespace-pre-line shadow-lg",
          tooltipSizes[size],
          variantStyle.bg,
          variantStyle.text,
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
