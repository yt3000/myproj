import { useCallback } from 'react';
import { AppState, LearningGoal, DailyRecord, Reward } from '../types';

export const useRecords = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  updateKidScore: (kidId: string) => void
) => {

  const addGoal = (kidId: string, goal: LearningGoal): void => {
    setState(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [kidId]: [...(prev.goals[kidId] || []), goal],
      },
    }));
    updateKidScore(kidId);
  };

  const updateGoal = (kidId: string, updatedGoal: LearningGoal): void => {
    setState(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [kidId]: (prev.goals[kidId] || []).map(g =>
          g.id === updatedGoal.id ? updatedGoal : g
        ),
      },
    }));
    updateKidScore(kidId);
  };

  const addDailyRecord = (kidId: string, record: DailyRecord): void => {
    setState(prev => ({
      ...prev,
      dailyRecords: {
        ...prev.dailyRecords,
        [kidId]: [...(prev.dailyRecords[kidId] || []), record],
      },
    }));
    updateKidScore(kidId);
  };

  const deleteDailyRecord = (kidId: string, recordId: string): void => {
    setState(prev => ({
      ...prev,
      dailyRecords: {
        ...prev.dailyRecords,
        [kidId]: (prev.dailyRecords[kidId] || []).filter(r => r.id !== recordId),
      },
    }));
    updateKidScore(kidId);
  };

  const addReward = (kidId: string, reward: Reward): void => {
    setState(prev => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        [kidId]: [...(prev.rewards[kidId] || []), reward],
      },
    }));
    updateKidScore(kidId);
  };

  return {
    addGoal,
    updateGoal,
    addDailyRecord,
    deleteDailyRecord,
    addReward,
    getGoalsForKid: (kidId: string) => state.goals[kidId] || [],
    getRecordsForKid: (kidId: string) => state.dailyRecords[kidId] || [],
    getRewardsForKid: (kidId: string) => (state.rewards[kidId] || []),
  };
};
