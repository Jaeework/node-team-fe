import type { TooltipArrowPosition } from "../components/ui/tooltip/Tooltip.tokens";
import type { UserLevel } from "../features/user/user.types";

export const LEVEL_INFO: Record<
  UserLevel,
  { message: string; arrowPosition: TooltipArrowPosition }
> = {
  A2: {
    message: "Elementary\n기본 구문 이해, 간단한 일상 대화 가능",
    arrowPosition: "left",
  },
  B1: {
    message: "Intermediate\n여행 상황 대처, 경험 설명 가능",
    arrowPosition: "center-left",
  },
  B2: {
    message: "Upper Intermediate\n원어민과 유창하게 대화, 상세한 글 작성 가능",
    arrowPosition: "center-right",
  },
  C1: {
    message: "Advanced\n유창한 표현, 전문적 목적으로 언어 사용 가능",
    arrowPosition: "right",
  },
};
