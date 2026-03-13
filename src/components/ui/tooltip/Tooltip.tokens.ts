export type TooltipSize = keyof typeof tooltipSizes;

export const tooltipSizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
} as const;

export type TooltipVariant = keyof typeof tooltipVariants;

export const tooltipVariants = {
  primary: {
    bg: "bg-primary",
    text: "text-background",
    arrow: "var(--color-primary)",
  },
  ink: {
    bg: "bg-ink",
    text: "text-background",
    arrow: "var(--color-ink)",
  },
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    arrow: "var(--color-paper)",
  },
  danger: {
    bg: "bg-red-500",
    text: "text-white",
    arrow: "#ef4444",
  },
  success: {
    bg: "bg-green-500",
    text: "text-white",
    arrow: "#22c55e",
  },
  accent: {
    bg: "bg-accent",
    text: "text-ink",
    arrow: "var(--color-accent)",
  },
} as const;

export type TooltipPosition = keyof typeof tooltipPositions;

export const tooltipPositions = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "top-1/2 -translate-y-1/2 right-full mr-2",
  right: "top-1/2 -translate-y-1/2 left-full ml-2",
} as const;

export type TooltipArrowPosition = keyof typeof tooltipArrowPositions;

export const tooltipArrowPositions = {
  center: "left-1/2 -translate-x-1/2",
  left: "left-[12.5%]",
  "center-left": "left-[37.5%]",
  "center-right": "left-[62.5%]",
  right: "left-[87.5%]",
  "v-center": "top-1/2 -translate-y-1/2",
} as const;

export const tooltipArrowDirections = {
  top: "top-full border-x-[6px] border-t-[6px] border-x-transparent border-b-0",
  bottom:
    "bottom-full border-x-[6px] border-b-[6px] border-x-transparent border-t-0",
  left: "left-full border-y-[6px] border-l-[6px] border-y-transparent border-r-0",
  right:
    "right-full border-y-[6px] border-r-[6px] border-y-transparent border-l-0",
} as const;
