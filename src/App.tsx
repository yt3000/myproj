import { useState } from 'react';
import { useKids } from './hooks/useKids';
import { useRecords } from './hooks/useRecords';
import { KidCard } from './components/KidCard';
import { AddKidModal } from './components/AddKidModal';
import { exportData, importData } from './utils/storage';
import './index.css';

function App() {
  const { state, setState, addKid, updateKidScore, deleteKid } = useKids();
  const { addDailyRecord, deleteDailyRecord, addReward } = useRecords(state, setState, updateKidScore);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">家庭小孩积分奖励系统</h1>
        <p className="text-center text-gray-600">
          支持多孩子独立积分管理，目标追踪，奖励兑换
        </p>
      </header>

      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => exportData(state)}
          className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
        >
          📥 导出备份
        </button>
        <label className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 cursor-pointer">
          📤 导入备份
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                try {
                  const imported = await importData(file);
                  setState(imported);
                  alert('导入成功！');
                } catch {
                  alert('导入失败，请检查文件格式');
                }
              }
            }}
          />
        </label>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setAddModalOpen(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          + 添加孩子
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {state.kids.map((kid) => (
          <KidCard
            key={kid.id}
            kid={kid}
            records={state.dailyRecords[kid.id] || []}
            rewards={state.rewards[kid.id] || []}
            onAddRecord={addDailyRecord}
            onDeleteRecord={deleteDailyRecord}
            onAddReward={addReward}
            onDeleteKid={deleteKid}
          />
        ))}
      </div>

      <details className="mt-8 p-4 border rounded bg-gray-50">
        <summary className="font-bold cursor-pointer text-lg text-center">规则说明</summary>
        <div className="mt-4 space-y-2 text-sm">
          <p><strong>积分规则：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>校级及以上比赛优秀：+10分</li>
            <li>校内老师书面表扬：+3分</li>
            <li>校内批评：-3分，检讨：-6分（重复错误加倍扣分）</li>
            <li>每周家庭卫生干净：+1分，特别脏扣1分</li>
            <li>按时完成所有作业：+1分，两次以上未完成扣1分</li>
          </ul>
          <p className="mt-3"><strong>奖励规则：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>每10分</strong>：自选礼品（≤100元）或 文体娱乐（≤200元）二选一</li>
            <li><strong>每100分</strong>：超市购物（≤1000元）/自选礼品（≤1000元）/近郊两日游 三选一</li>
            <li><strong>每300分</strong>：远途七日游一次</li>
          </ul>
        </div>
      </details>

      <footer className="mt-12 text-center text-sm text-gray-400">
        数据保存在本地浏览器中，清除浏览器数据会导致记录丢失，请定期导出备份
      </footer>

      <AddKidModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addKid}
      />
    </div>
  );
}

export default App;
