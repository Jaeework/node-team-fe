export type InputSize = keyof typeof inputSizes;

export const inputSizes = {
  xs: "h-[1.188rem] px-2",
  sm: "h-[1.5rem] px-2",
  md: "h-[1.75rem] px-3",
  lg: "h-[1.875rem] px-3",
  xl: "h-[2.25rem] px-4",
} as const;

export type InputColor = keyof typeof inputColors;

export const inputColors = {
  default: {
    wrapper: "bg-background border-transparent",
    input:
      "bg-background border-transparent [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-background)]",
  },
  paper: {
    wrapper: "bg-paper/50 border-transparent",
    input:
      "bg-paper/50 border-transparent [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f7f7f5]",
  },
  primary: {
    wrapper: "bg-primary/5 border-transparent",
    input:
      "bg-primary/5 border-transparent [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f3f6f8]",
  },
  error: {
    wrapper: "bg-red-50 border-red-300",
    input:
      "bg-red-50 border-red-300 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_theme(colors.red.50)]",
  },
  success: {
    wrapper: "bg-green-50 border-green-300",
    input:
      "bg-green-50 border-green-300 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_theme(colors.green.50)]",
  },
};
