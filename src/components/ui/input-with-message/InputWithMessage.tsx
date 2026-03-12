import { cn } from "../../../lib/utils";
import InputWithIcon from "../input-with-icon/InputWithIcon";
import { inputWithMessageVariants } from "./InputWithMessage.tokens";
import type { InputWithMessageProps } from "./InputWithMessage.types";

const InputWithMessage = ({
  messages,
  color,
  ...props
}: InputWithMessageProps) => {
  const hasError = messages?.some((m) => m.variant === "error");
  const inputColor = hasError ? "error" : color;

  return (
    <div className="flex flex-col gap-1">
      <InputWithIcon color={inputColor} {...props} />
      {messages && messages.length > 0 && (
        <div className="flex translate-x-1 flex-wrap gap-x-3 gap-y-1 text-sm">
          {messages.map((m, index) => (
            <span
              key={index}
              className={cn(inputWithMessageVariants[m.variant])}
            >
              {m.message}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithMessage;
