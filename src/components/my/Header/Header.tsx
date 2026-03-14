import { cn } from "../../../lib/utils";
import type { HeaderProps } from "./Header.types";

const Header = ({
  title,
  description,
  actionElement,
  className,
}: HeaderProps) => {
  return (
    <div
      className={cn("mb-2 flex w-full items-start justify-between", className)}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-ink flex items-center gap-2 text-3xl font-bold">
          {title}
        </h1>
        {description && <p className="text-ink/60 text-sm">{description}</p>}
      </div>
      {actionElement && <div>{actionElement}</div>}
    </div>
  );
};

export default Header;
