import { useState, useEffect } from 'react';
import type { Kid, AppState } from '../types';
import { loadState, saveState, getDefaultState } from '../utils/storage';
import { calculateTotalScore } from '../utils/calculations';

export const useKids = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = loadState();
    return saved || getDefaultState();
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addKid = (kid: Kid): void => {
    setState(prev => ({
      ...prev,
      kids: [...prev.kids, kid],
      goals: {
        ...prev.goals,
        [kid.id]: [],
      },
      dailyRecords: {
        ...prev.dailyRecords,
        [kid.id]: [],
      },
      rewards: {
        ...prev.rewards,
        [kid.id]: [],
      },
    }));
  };

  const updateKidScore = (kidId: string): void => {
    setState(prev => {
      const kid = prev.kids.find(k => k.id === kidId);
      if (!kid) return prev;

      const total = calculateTotalScore(
        prev.goals[kidId] || [],
        prev.dailyRecords[kidId] || [],
        prev.rewards[kidId] || []
      );

      return {
        ...prev,
        kids: prev.kids.map(k =>
          k.id === kidId ? { ...k, totalScore: total } : k
        ),
      };
    });
  };

  const deleteKid = (kidId: string): void => {
    setState(prev => {
      const { [kidId]: _, ...remainingKids } = prev.goals;
      const { [kidId]: __, ...remainingDaily } = prev.dailyRecords;
      const { [kidId]: ___, ...remainingRewards } = prev.rewards;

      return {
        ...prev,
        kids: prev.kids.filter(k => k.id !== kidId),
        goals: remainingKids,
        dailyRecords: remainingDaily,
        rewards: remainingRewards,
      };
    });
  };

  return { state, setState, addKid, updateKidScore, deleteKid };
};
