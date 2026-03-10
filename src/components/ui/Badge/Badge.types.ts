import React from "react";
import type { BadgeColor, BadgeRadius, BadgeSize } from "./Badge.tokens";

export type BadgeProps = {
  size?: BadgeSize;
  color?: BadgeColor;
  radius?: BadgeRadius;
} & React.HTMLAttributes<HTMLDivElement>;
