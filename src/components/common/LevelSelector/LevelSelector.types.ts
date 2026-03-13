import type { UserLevel } from "../../../features/user/user.types";

export interface LevelSelectorProps {
  selectedLevel: UserLevel | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
