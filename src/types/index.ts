export interface LearningGoal {
  id: string;
  unit: string;          // e.g., "第一单元"
  subject: string;      // 语文/数学/英语
  targetLevel: string;  // 良好/优秀
  resultLevel: string;
  score: number;
  progressScore: number;
}

export interface DailyRecord {
  id: string;
  date: string;
  category: string;      // 学习/卫生/书写/比赛/表扬/批评
  description: string;
  points: number;
}

export interface Reward {
  id: string;
  date: string;
  tier: 'ten' | 'hundred' | 'threeHundred';  // 十分/百分/三百分
  description: string;
  pointsUsed: number;
}

export interface Kid {
  id: string;
  name: string;
  grade: string;        // 五年级下学期
  semester: string;
  totalScore: number;
  createdAt: string;
}

export interface AppState {
  kids: Kid[];
  goals: Record<string, LearningGoal[]>;  // kidId -> goals
  dailyRecords: Record<string, DailyRecord[]>;
  rewards: Record<string, Reward[]>;
}
