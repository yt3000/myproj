import { useState } from 'react';
import type { DailyRecord } from '../types';

interface RecordModalProps {
  isOpen: boolean;
  kidName: string;
  onClose: () => void;
  onAdd: (record: DailyRecord) => void;
}

const categories = [
  { label: '校级以上比赛优秀', value: '比赛', defaultPoints: 10 },
  { label: '校内老师表扬', value: '表扬', defaultPoints: 3 },
  { label: '校内批评', value: '批评', defaultPoints: -3 },
  { label: '检讨', value: '检讨', defaultPoints: -6 },
  { label: '每周家庭卫生', value: '卫生', defaultPoints: 1 },
  { label: '学习习惯完成', value: '学习', defaultPoints: 1 },
  { label: '学习/卫生/书写', value: '综合', defaultPoints: 2 },
  { label: '自定义', value: 'custom', defaultPoints: 0 },
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">{kidName} - 添加积分记录</h3>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">类别</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <label
                  key={cat.value}
                  className={`flex items-center p-2 border rounded cursor-pointer ${
                    category === cat.value ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.value}
                    checked={category === cat.value}
                    onChange={() => handleCategoryChange(cat.value)}
                    className="mr-2"
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">描述</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：完成作业，打扫房间..."
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">积分 (正数加分，负数扣分)</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
