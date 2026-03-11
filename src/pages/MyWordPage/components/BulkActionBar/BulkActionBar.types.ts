export interface BulkActionBarProps {
  selectedCount: number;
  onDeselectAll?: () => void;
  onChangeStatus?: () => void;
  onDelete?: () => void;
  className?: string;
}
