import { describe, it, expect } from 'vitest';
import { calculateTotalScore, getAvailableRewards } from './calculations';
import { LearningGoal, DailyRecord, Reward } from '../types';

describe('Score calculation utilities', () => {
  describe('calculateTotalScore', () => {
    it('should calculate total score correctly with goals, daily records, and rewards', () => {
      const goals: LearningGoal[] = [
        {
          id: '1',
          unit: '第一单元',
          subject: '数学',
          targetLevel: '优秀',
          resultLevel: '良好',
          score: 80,
          progressScore: 10,
        },
        {
          id: '2',
          unit: '第二单元',
          subject: '语文',
          targetLevel: '良好',
          resultLevel: '优秀',
          score: 90,
          progressScore: 15,
        },
      ];

      const dailyRecords: DailyRecord[] = [
        {
          id: '1',
          date: '2026-04-06',
          category: '学习',
          description: '完成作业',
          points: 5,
        },
        {
          id: '2',
          date: '2026-04-06',
          category: '表扬',
          description: '课堂表现优秀',
          points: 10,
        },
      ];

      const rewards: Reward[] = [
        {
          id: '1',
          date: '2026-04-06',
          tier: 'ten',
          description: '兑换铅笔',
          pointsUsed: 10,
        },
        {
          id: '2',
          date: '2026-04-06',
          tier: 'hundred',
          description: '兑换玩具',
          pointsUsed: 100,
        },
      ];

      const totalScore = calculateTotalScore(goals, dailyRecords, rewards);
      expect(totalScore).toBe(80 + 10 + 90 + 15 + 5 + 10 - 10 - 100);
    });

    it('should handle empty arrays correctly', () => {
      const totalScore = calculateTotalScore([], [], []);
      expect(totalScore).toBe(0);
    });

    it('should handle only goals', () => {
      const goals: LearningGoal[] = [
        {
          id: '1',
          unit: '第一单元',
          subject: '数学',
          targetLevel: '优秀',
          resultLevel: '良好',
          score: 80,
          progressScore: 10,
        },
      ];

      const totalScore = calculateTotalScore(goals, [], []);
      expect(totalScore).toBe(90);
    });

    it('should handle only daily records', () => {
      const dailyRecords: DailyRecord[] = [
        {
          id: '1',
          date: '2026-04-06',
          category: '学习',
          description: '完成作业',
          points: 5,
        },
      ];

      const totalScore = calculateTotalScore([], dailyRecords, []);
      expect(totalScore).toBe(5);
    });

    it('should handle only rewards', () => {
      const rewards: Reward[] = [
        {
          id: '1',
          date: '2026-04-06',
          tier: 'ten',
          description: '兑换铅笔',
          pointsUsed: 10,
        },
      ];

      const totalScore = calculateTotalScore([], [], rewards);
      expect(totalScore).toBe(-10);
    });
  });

  describe('getAvailableRewards', () => {
    it('should calculate available rewards correctly', () => {
      expect(getAvailableRewards(50)).toEqual({
        tenPoints: 5,
        hundredPoints: 0,
        threeHundredPoints: 0,
      });

      expect(getAvailableRewards(150)).toEqual({
        tenPoints: 15,
        hundredPoints: 1,
        threeHundredPoints: 0,
      });

      expect(getAvailableRewards(350)).toEqual({
        tenPoints: 35,
        hundredPoints: 3,
        threeHundredPoints: 1,
      });

      expect(getAvailableRewards(1000)).toEqual({
        tenPoints: 100,
        hundredPoints: 10,
        threeHundredPoints: 3,
      });
    });

    it('should handle zero score', () => {
      expect(getAvailableRewards(0)).toEqual({
        tenPoints: 0,
        hundredPoints: 0,
        threeHundredPoints: 0,
      });
    });

    it('should handle negative score', () => {
      expect(getAvailableRewards(-50)).toEqual({
        tenPoints: -5,
        hundredPoints: -1,
        threeHundredPoints: -1,
      });
    });
  });
});
