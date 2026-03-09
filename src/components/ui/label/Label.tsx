import { type LabelProps } from "./Label.types";
import { labelSizes } from "./Label.tokens";
import { cn } from "../../../lib/utils";

const Label = ({ htmlFor, size, className, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-ink-700 mb-1 block text-sm font-semibold",
        labelSizes[size],
        className,
      )}
      {...props}
    />
  );
};

export default Label;
