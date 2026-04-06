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

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{kid.name}</h3>
          <p className="text-gray-600">{kid.grade}{kid.semester}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{kid.totalScore}</div>
          <div className="text-sm text-gray-500">当前积分</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
        <div className="text-center">
          <div className="font-semibold">{available.tenPoints}</div>
          <div className="text-sm text-gray-600">十分奖励</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{available.hundredPoints}</div>
          <div className="text-sm text-gray-600">百分奖励</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{available.threeHundredPoints}</div>
          <div className="text-sm text-gray-600">三百分奖励</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setShowRecordModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          添加积分记录
        </button>
        <button
          onClick={() => setShowRewardModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          兑换奖励
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
        >
          {showHistory ? '隐藏历史' : '查看历史'}
        </button>
        <button
          onClick={() => {
            if (confirm(`确定要删除 ${kid.name} 的所有记录吗？`)) {
              onDeleteKid(kid.id);
            }
          }}
          className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 text-sm ml-auto"
        >
          删除
        </button>
      </div>

      {showHistory && (
        <HistoryView
          kidId={kid.id}
          records={records}
          rewards={rewards}
          onDeleteRecord={onDeleteRecord}
        />
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
