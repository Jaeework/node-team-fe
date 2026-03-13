import type { UserLevel } from "../../features/user/user.types";

export type ArticleCardProps = {
  id: number | string;
  title: string;
  level: UserLevel | string;
  date: string;
  image?: string;
};
