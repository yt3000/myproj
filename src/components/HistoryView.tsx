import type { DailyRecord, Reward } from '../types';

interface HistoryViewProps {
  kidId: string;
  records: DailyRecord[];
  rewards: Reward[];
  onDeleteRecord: (kidId: string, recordId: string) => void;
}

const tierName = {
  ten: '10分奖励',
  hundred: '100分奖励',
  threeHundred: '300分奖励',
};

const tierColors = {
  ten: 'bg-[var(--primary-50)] text-[var(--primary-700)]',
  hundred: 'bg-[var(--warning-50)] text-[var(--warning-700)]',
  threeHundred: 'bg-[var(--success-50)] text-[var(--success-700)]',
};

export const HistoryView = ({ kidId, records, rewards, onDeleteRecord }: HistoryViewProps) => {
  const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
  const sortedRewards = [...rewards].sort((a, b) => b.date.localeCompare(a.date));

  const allItems = [
    ...sortedRecords.map(r => ({ ...r, type: 'record' as const })),
    ...sortedRewards.map(r => ({ ...r, type: 'reward' as const })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const getRewardIcon = (tier: string) => {
    if (tier === 'ten') return '🎁';
    if (tier === 'hundred') return '🎉';
    return '✈️';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          历史记录
        </h4>

        {allItems.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-tertiary)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">暂无记录</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {allItems.map((item) => {
              if (item.type === 'record') {
                const record = item as DailyRecord & { type: 'record' };
                const isPositive = record.points > 0;
                return (
                  <div
                    key={record.id}
                    className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] hover:border-[var(--border-medium)] transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isPositive 
                        ? 'bg-[var(--success-50)] text-[var(--success-600)]' 
                        : 'bg-[var(--danger-50)] text-[var(--danger-600)]'
                    }`}>
                      {isPositive ? '+' : ''}{record.points}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {record.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[var(--text-tertiary)]">{record.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]"/>
                        <span className="text-xs text-[var(--text-secondary)]">{record.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteRecord(kidId, record.id)}
                      className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--danger-500)] hover:bg-[var(--danger-50)] rounded-lg transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                );
              } else {
                const reward = item as Reward & { type: 'reward' };
                return (
                  <div
                    key={reward.id}
                    className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] hover:border-[var(--border-medium)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg">
                      {getRewardIcon(reward.tier)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {reward.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[var(--text-tertiary)]">{reward.date}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${tierColors[reward.tier]}`}>
                          {tierName[reward.tier]}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-[var(--danger-500)]">
                      -{reward.pointsUsed}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};
