import type {
  TooltipArrowPosition,
  TooltipPosition,
  TooltipSize,
  TooltipVariant,
} from "./Tooltip.tokens";

export interface TooltipProps {
  message: string;
  position?: TooltipPosition;
  arrowPosition?: TooltipArrowPosition;
  variant?: TooltipVariant;
  size?: TooltipSize;
  className?: string;
}
