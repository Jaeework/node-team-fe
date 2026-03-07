export type ButtonSize = keyof typeof buttonSizes;

export const buttonSizes = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 px-6 has-[>svg]:px-4",
  xl: "h-11 px-4 text-lg",
  icon: "size-9 text-xs",
} as const;

export type ButtonRadius = keyof typeof buttonRadius;

export const buttonRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  pill: "rounded-full",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export const buttonVariants = {
  primary: "bg-primary text-background hover:bg-primary/90",
  paper: "bg-paper text-ink hover:bg-paper/80",
  border: "bg-border text-ink hover:bg-border/80",
  outline:
    "border border-border bg-background text-ink hover:bg-paper hover:text-ink",
  ink: "bg-ink text-background hover:bg-ink/80",
  ghost: "bg-transparent text-ink hover:bg-paper hover:text-ink",
  link: "text-primary underline-offset-4 hover:underline",
  background: "bg-background text-primary hover:bg-border",
} as const;
