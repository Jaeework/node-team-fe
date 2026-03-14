export interface BulkActionBarProps {
  selectedCount: number;
  isAllSelected?: boolean;
  onToggleSelectAll?: () => void;
  onChangeStatus?: () => void;
  onDelete?: () => void;
  className?: string;
}
