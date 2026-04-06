import type { DailyRecord, Reward } from '../types';

interface HistoryViewProps {
  kidId: string;
  records: DailyRecord[];
  rewards: Reward[];
  onDeleteRecord: (kidId: string, recordId: string) => void;
}

const tierName = {
  ten: '十分奖励',
  hundred: '百分奖励',
  threeHundred: '三百分奖励',
};

export const HistoryView = ({ kidId, records, rewards, onDeleteRecord }: HistoryViewProps) => {
  const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2">最近积分记录</h4>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2">日期</th>
              <th className="text-left p-2">类别</th>
              <th className="text-left p-2">描述</th>
              <th className="text-right p-2">积分</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 p-4">
                  暂无记录
                </td>
              </tr>
            ) : (
              sortedRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="p-2">{record.date}</td>
                  <td className="p-2">{record.category}</td>
                  <td className="p-2">{record.description}</td>
                  <td className={`p-2 text-right ${
                    record.points > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {record.points > 0 ? '+' : ''}{record.points}
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => onDeleteRecord(kidId, record.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {rewards.length > 0 && (
        <>
          <h4 className="font-bold mb-2 mt-4">已兑换奖励</h4>
          <div className="max-h-40 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2">日期</th>
                  <th className="text-left p-2">等级</th>
                  <th className="text-left p-2">内容</th>
                  <th className="text-right p-2">积分</th>
                </tr>
              </thead>
              <tbody>
                {[...rewards].sort((a, b) => b.date.localeCompare(a.date)).map((reward) => (
                  <tr key={reward.id} className="border-t">
                    <td className="p-2">{reward.date}</td>
                    <td className="p-2">{tierName[reward.tier]}</td>
                    <td className="p-2">{reward.description}</td>
                    <td className="p-2 text-right">-{reward.pointsUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
