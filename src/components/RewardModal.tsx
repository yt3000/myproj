import { useState } from 'react';
import type { Reward } from '../types';

interface RewardModalProps {
  isOpen: boolean;
  kidName: string;
  totalScore: number;
  onClose: () => void;
  onAdd: (reward: Reward) => void;
}

const tiers = [
  { label: '10分奖励', value: 'ten', points: 10, color: 'var(--primary-500)', icon: '🎁' },
  { label: '100分奖励', value: 'hundred', points: 100, color: 'var(--warning-500)', icon: '🎉' },
  { label: '300分奖励', value: 'threeHundred', points: 300, color: 'var(--success-500)', icon: '✈️' },
];

const options = {
  ten: [
    '自选礼品一项 (不超过100元)',
    '自选文体娱乐一次 (不超过200元)',
  ],
  hundred: [
    '超市自由购物1分钟 (不超过1000元)',
    '自选礼品一项 (不超过1000元)',
    '近郊目的地2日游一次',
  ],
  threeHundred: [
    '远郊目的地7日游一次',
  ],
};

export const RewardModal = ({ isOpen, kidName, totalScore, onClose, onAdd }: RewardModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tier, setTier] = useState<'ten' | 'hundred' | 'threeHundred'>('ten');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pointsUsed = tier === 'ten' ? 10 : tier === 'hundred' ? 100 : 300;
    const newReward: Reward = {
      id: crypto.randomUUID(),
      date,
      tier,
      description,
      pointsUsed,
    };
    onAdd(newReward);
  };

  const canClaim = (points: number) => totalScore >= points;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-light)] animate-scale-in">
        <div className="px-6 py-5 border-b border-[var(--border-light)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                兑换奖励
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">{kidName}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--primary-50)] rounded-full">
              <span className="text-sm text-[var(--text-secondary)]">可用积分:</span>
              <span className="text-lg font-bold text-[var(--primary-600)]">{totalScore}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
              奖励等级
            </label>
            <div className="grid grid-cols-3 gap-3">
              {tiers.map((t) => {
                const canClaimThis = canClaim(t.points);
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => canClaimThis && setTier(t.value as 'ten' | 'hundred' | 'threeHundred')}
                    disabled={!canClaimThis}
                    className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${
                      tier === t.value
                        ? 'bg-[var(--primary-50)] border-[var(--primary-500)] shadow-md'
                        : canClaimThis
                        ? 'bg-[var(--bg-secondary)] border-[var(--border-light)] hover:border-[var(--border-medium)]'
                        : 'bg-[var(--bg-secondary)] border-[var(--border-light)] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{t.label}</div>
                    <div className={`text-xs mt-1 ${canClaimThis ? 'text-[var(--primary-600)]' : 'text-[var(--danger-500)]'}`}>
                      {t.points}分
                    </div>
                    {!canClaimThis && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]/60 rounded-xl">
                        <span className="text-xs font-medium text-[var(--danger-500)]">积分不足</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options Preview */}
          <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
              可选项目
            </p>
            <ul className="space-y-1.5">
              {options[tier].map((opt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-500)] mt-1.5 flex-shrink-0"/>
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              兑换内容
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：千岛湖两日游"
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-light)] transition-all duration-200"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!canClaim(tier === 'ten' ? 10 : tier === 'hundred' ? 100 : 300)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200"
            >
              确认兑换
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
