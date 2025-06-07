export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  dateEarned?: Date;
}

export type AchievementsMap = Record<string, Achievement>;