export type InputWithMessageVariants = keyof typeof inputWithMessageVariants;

export const inputWithMessageVariants = {
  default: "text-gray-400",
  error: "text-red-500",
  success: "text-green-600",
} as const;
