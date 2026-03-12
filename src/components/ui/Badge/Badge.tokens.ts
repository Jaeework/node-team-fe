export type BadgeSize = keyof typeof badgeSizes;

export const badgeSizes = {
  "2xs": "px-1.5 py-0.5 text-[10px] font-semibold leading-none",
  xs: "px-2 py-1 text-[10px] font-semibold leading-none",
  sm: "px-2 py-1 text-xs font-semibold",
  md: "px-2.5 py-1.5 text-sm font-semibold",
  lg: "px-3 py-2 text-base font-bold",
} as const;

export type BadgeColor = keyof typeof badgeColors;

export const badgeColors = {
  A2: "bg-green-100 text-green-800 border-green-200",
  B1: "bg-blue-100 text-blue-800 border-blue-200",
  B2: "bg-purple-100 text-purple-800 border-purple-200",
  C1: "bg-red-100 text-red-800 border-red-200",
  word: "bg-blue-50 text-blue-700 border-blue-200",
  idiom: "bg-orange-50 text-orange-700 border-orange-200",
  learning: "bg-amber-100 text-amber-800 border-amber-200",
  mastered: "bg-green-100 text-green-800 border-green-200",
  primary: "bg-white text-slate-900 border-slate-200",
  outline: "bg-transparent text-slate-600 border-slate-300",
} as const;

export type BadgeRadius = keyof typeof badgeRadius;

export const badgeRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;
