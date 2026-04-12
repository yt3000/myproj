import { useState } from 'react';
import type { Kid, DailyRecord, Reward } from '../types';
import { getAvailableRewards } from '../utils/calculations';
import { RecordModal } from './RecordModal';
import { RewardModal } from './RewardModal';
import { HistoryView } from './HistoryView';

interface KidCardProps {
  kid: Kid;
  records: DailyRecord[];
  rewards: Reward[];
  onAddRecord: (kidId: string, record: DailyRecord) => void;
  onDeleteRecord: (kidId: string, recordId: string) => void;
  onAddReward: (kidId: string, reward: Reward) => void;
  onDeleteKid: (kidId: string) => void;
}

export const KidCard = ({
  kid,
  records,
  rewards,
  onAddRecord,
  onDeleteRecord,
  onAddReward,
  onDeleteKid,
}: KidCardProps) => {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const available = getAvailableRewards(kid.totalScore);
  const progressToNext10 = kid.totalScore % 10;
  const progressPercent = (progressToNext10 / 10) * 100;
  const pointsToNext = 10 - progressToNext10;

  return (
    <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/25">
              {kid.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{kid.name}</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {kid.grade} · {kid.semester}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--primary-600)]">
              {kid.totalScore}
            </div>
            <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide font-medium">
              当前积分
            </div>
          </div>
        </div>

        {/* Progress Bar - Figma Style */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[var(--text-secondary)]">距离下一个奖励</span>
            <span className="font-medium text-[var(--primary-600)]">{pointsToNext} 分</span>
          </div>
          <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Rewards Summary - Figma Style */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{available.tenPoints}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">10分奖励</div>
          </div>
          <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{available.hundredPoints}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">100分奖励</div>
          </div>
          <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{available.threeHundredPoints}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">300分奖励</div>
          </div>
        </div>

        {/* Action Buttons - Figma Style */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowRecordModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-500)] text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-500/20 hover:bg-[var(--primary-600)] hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            添加积分
          </button>

          <button
            onClick={() => setShowRewardModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-50)] text-[var(--primary-700)] text-sm font-medium rounded-xl border border-[var(--primary-200)] hover:bg-[var(--primary-100)] hover:border-[var(--primary-300)] transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            兑换奖励
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-xl transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <button
            onClick={() => {
              if (confirm(`确定要删除 ${kid.name} 的所有记录吗？`)) {
                onDeleteKid(kid.id);
              }
            }}
            className="px-4 py-2.5 text-[var(--text-tertiary)] hover:text-[var(--danger-500)] hover:bg-[var(--danger-50)] rounded-xl transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* History Section */}
      {showHistory && (
        <div className="border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
          <div className="p-4">
            <HistoryView
              kidId={kid.id}
              records={records}
              rewards={rewards}
              onDeleteRecord={onDeleteRecord}
            />
          </div>
        </div>
      )}

      <RecordModal
        isOpen={showRecordModal}
        kidName={kid.name}
        onClose={() => setShowRecordModal(false)}
        onAdd={(record: DailyRecord) => {
          onAddRecord(kid.id, record);
          setShowRecordModal(false);
        }}
      />

      <RewardModal
        isOpen={showRewardModal}
        kidName={kid.name}
        totalScore={kid.totalScore}
        onClose={() => setShowRewardModal(false)}
        onAdd={(reward: Reward) => {
          onAddReward(kid.id, reward);
          setShowRewardModal(false);
        }}
      />
    </div>
  );
};
