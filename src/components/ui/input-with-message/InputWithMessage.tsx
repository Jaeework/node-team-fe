import { cn } from "../../../lib/utils";
import InputWithIcon from "../input-with-icon/InputWithIcon";
import { inputWithMessageVariants } from "./InputWithMessage.tokens";
import type { InputWithMessageProps } from "./InputWithMessage.types";

const InputWithMessage = ({
  message,
  variant = "default",
  color,
  ...props
}: InputWithMessageProps) => {
  const inputColor = message && variant === "error" ? "error" : color;

  return (
    <div className="relative flex flex-col gap-1">
      <InputWithIcon color={inputColor} {...props} />
      {message && (
        <p
          className={cn(
            "absolute -bottom-5 left-2 text-sm",
            inputWithMessageVariants[variant],
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default InputWithMessage;
