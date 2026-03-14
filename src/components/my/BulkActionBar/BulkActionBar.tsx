import { cn } from "../../../lib/utils";
import Button from "../../ui/button/Button";
import { ArrowRightLeft, Trash2 } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  isAllSelected?: boolean;
  onToggleSelectAll?: () => void;
  onChangeStatus?: () => void;
  onDelete?: () => void;
  className?: string;
}

const BulkActionBar = ({
  selectedCount,
  isAllSelected,
  onToggleSelectAll,
  onChangeStatus,
  onDelete,
  className,
}: BulkActionBarProps) => {
  const isDisabled = selectedCount === 0;

  return (
    <div
      className={cn(
        "bg-primary/10 flex w-full flex-col items-center justify-between gap-3 rounded-xl px-4 py-3 md:flex-row md:gap-0",
        className,
      )}
    >
      <div className="flex w-full items-center justify-start gap-3 text-sm md:w-auto md:text-base">
        <span className="text-ink flex items-center gap-2 font-bold">
          <span className="text-primary">✔</span>
          {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
        </span>

        {onToggleSelectAll && (
          <>
            <span className="text-border hidden md:inline">|</span>

            <Button
              variant="link"
              size="sm"
              onClick={onToggleSelectAll}
              className="text-primary hover:text-primary/80 px-0 font-semibold underline-offset-4"
            >
              {isAllSelected ? "deselect all" : "select all"}
            </Button>
          </>
        )}
      </div>

      <div className="flex w-full items-center gap-2 md:w-auto">
        {onChangeStatus && (
          <Button
            variant="paper"
            onClick={onChangeStatus}
            disabled={isDisabled}
            className="text-primary hover:text-primary flex-1 justify-center bg-white px-3 py-1.5 text-sm font-semibold shadow-xs transition-all hover:bg-white hover:font-bold active:scale-95 disabled:opacity-50 md:flex-none md:px-5 md:py-2"
          >
            <ArrowRightLeft className="size-4 shrink-0" strokeWidth={2.5} />
            change Status
          </Button>
        )}

        {onDelete && (
          <Button
            variant="danger"
            onClick={onDelete}
            disabled={isDisabled}
            className="flex-1 justify-center bg-white px-3 py-1.5 text-sm font-semibold text-red-500 shadow-xs transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 md:flex-none md:px-5 md:py-2"
          >
            <Trash2 className="size-4 shrink-0" strokeWidth={2.5} />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkActionBar;
