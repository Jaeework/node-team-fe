import { type LabelHTMLAttributes } from "react";
import type { LabelSize } from "./Label.tokens";

export type LabelProps = {
  size: LabelSize;
} & LabelHTMLAttributes<HTMLLabelElement>;
