import { useState } from 'react';
import type { DailyRecord } from '../types';

interface RecordModalProps {
  isOpen: boolean;
  kidName: string;
  onClose: () => void;
  onAdd: (record: DailyRecord) => void;
}

const categories = [
  { label: '校级以上比赛优秀', value: '比赛', defaultPoints: 10, icon: '🏆' },
  { label: '校内老师表扬', value: '表扬', defaultPoints: 3, icon: '👏' },
  { label: '校内批评', value: '批评', defaultPoints: -3, icon: '📝' },
  { label: '检讨', value: '检讨', defaultPoints: -6, icon: '😔' },
  { label: '每周家庭卫生', value: '卫生', defaultPoints: 1, icon: '🧹' },
  { label: '学习习惯完成', value: '学习', defaultPoints: 1, icon: '📚' },
  { label: '综合评定', value: '综合', defaultPoints: 2, icon: '⭐' },
  { label: '自定义', value: 'custom', defaultPoints: 0, icon: '✏️' },
];

export const RecordModal = ({ isOpen, kidName, onClose, onAdd }: RecordModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('custom');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const found = categories.find(c => c.value === newCategory);
    if (found) {
      setPoints(found.defaultPoints);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: DailyRecord = {
      id: crypto.randomUUID(),
      date,
      category,
      description,
      points,
    };
    onAdd(newRecord);
  };

  if (!isOpen) return null;

  const isPositive = points >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-light)] animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-[var(--border-light)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                添加积分记录
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">{kidName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
              类别
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-200 ${
                    category === cat.value
                      ? 'bg-[var(--primary-50)] border-[var(--primary-500)] text-[var(--primary-700)]'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              描述
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：完成作业，打扫房间..."
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              积分
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPoints(p => p - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>

              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                className={`flex-1 px-4 py-2.5 bg-[var(--bg-secondary)] border rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  isPositive 
                    ? 'border-[var(--success-500)] text-[var(--success-600)] focus:ring-[var(--success-500)]' 
                    : 'border-[var(--danger-500)] text-[var(--danger-600)] focus:ring-[var(--danger-500)]'
                }`}
                required
              />

              <button
                type="button"
                onClick={() => setPoints(p => p + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
            <p className={`mt-2 text-xs ${isPositive ? 'text-[var(--success-600)]' : 'text-[var(--danger-600)]'}`}>
              {isPositive ? '正数加分' : '负数扣分'}
            </p>
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
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              添加记录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
