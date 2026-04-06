import { LearningGoal, DailyRecord, Reward } from '../types';

export const calculateTotalScore = (
  goals: LearningGoal[],
  dailyRecords: DailyRecord[],
  rewards: Reward[]
): number => {
  const goalScore = goals.reduce((sum, goal) => sum + goal.score + goal.progressScore, 0);
  const dailyScore = dailyRecords.reduce((sum, record) => sum + record.points, 0);
  const rewardDeduction = rewards.reduce((sum, reward) => sum + reward.pointsUsed, 0);
  return goalScore + dailyScore - rewardDeduction;
};

export const getAvailableRewards = (totalScore: number): {
  tenPoints: number;
  hundredPoints: number;
  threeHundredPoints: number;
} => {
  const ten = Math.floor(totalScore / 10);
  const hundred = Math.floor(totalScore / 100);
  const threeHundred = Math.floor(totalScore / 300);
  return {
    tenPoints: ten,
    hundredPoints: hundred,
    threeHundredPoints: threeHundred,
  };
};
