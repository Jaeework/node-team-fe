import { useState } from "react";
import Input from "../../ui/input/Input";
import Tooltip from "../../ui/tooltip/Tooltip";
import { cn } from "../../../lib/utils";
import { LEVEL_INFO } from "../../../constants/levelInfo";
import type { UserLevel } from "../../../features/user/user.types";
import type { LevelSelectorProps } from "./LevelSelector.types";
import Label from "../../ui/label/Label";

const LEVELS: UserLevel[] = ["A2", "B1", "B2", "C1"];

const LevelSelector = ({
  selectedLevel,
  onChange,
  disabled = false,
}: LevelSelectorProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setShowTooltip(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label size="sm">English Proficiency Level</Label>
      <div className="relative grid grid-cols-4 gap-3">
        {LEVELS.map((level) => (
          <label className={cn(!disabled && "cursor-pointer")} key={level}>
            <Input
              disabled={disabled}
              className="peer absolute h-0 w-0 opacity-0"
              name="level"
              value={level}
              checked={selectedLevel === level}
              onChange={handleChange}
              type="radio"
            />
            <div className="peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary border-ink-300 bg-ink-50 flex flex-col items-center justify-center rounded-lg border p-3 transition-all">
              <span className="text-xs font-bold tracking-wider uppercase">
                {level}
              </span>
            </div>
          </label>
        ))}
        {selectedLevel && showTooltip && (
          <Tooltip
            message={LEVEL_INFO[selectedLevel].message}
            position="bottom"
            arrowPosition={LEVEL_INFO[selectedLevel].arrowPosition}
            variant="accent"
            size="sm"
            className="w-full"
            onClose={() => setShowTooltip(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LevelSelector;
