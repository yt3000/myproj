import { useState } from 'react';
import { Reward } from '../types';

interface RewardModalProps {
  isOpen: boolean;
  kidName: string;
  totalScore: number;
  onClose: () => void;
  onAdd: (reward: Reward) => void;
}

const tiers = [
  { label: '十分奖励 (10分)', value: 'ten', points: 10 },
  { label: '百分奖励 (100分)', value: 'hundred', points: 100 },
  { label: '三百分奖励 (300分)', value: 'threeHundred', points: 300 },
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-2">{kidName} - 兑换奖励</h3>
        <p className="mb-4 text-gray-600">当前积分: {totalScore}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">奖励等级</label>
            <div className="flex gap-2">
              {tiers.map((t) => (
                <label
                  key={t.value}
                  className={`flex-1 text-center p-2 border rounded cursor-pointer ${tier === t.value ? 'bg-green-100 border-green-500' : ''}`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={t.value}
                    checked={tier === t.value}
                    onChange={() => setTier(t.value as any)}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3 p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium mb-1">可选项目：</p>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              {options[tier].map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">兑换内容</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：千岛湖两日游"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={(tier === 'ten' && totalScore < 10) || (tier === 'hundred' && totalScore < 100) || (tier === 'threeHundred' && totalScore < 300)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              兑换
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
