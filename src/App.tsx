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

  const totalKids = state.kids.length;
  const totalPoints = state.kids.reduce((sum, kid) => sum + kid.totalScore, 0);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-[var(--border-light)]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                  家庭积分奖励
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  {totalKids} 位孩子 · {totalPoints} 总积分
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => exportData(state)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                导出
              </button>
              <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                导入
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
                      } catch {
                        alert('导入失败，请检查文件格式');
                      }
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Add Kid Button */}
        <button
          onClick={() => setAddModalOpen(true)}
          className="w-full group mb-8 p-6 border-2 border-dashed border-[var(--border-medium)] rounded-2xl hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] group-hover:bg-[var(--primary-500)] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span className="text-[var(--text-secondary)] group-hover:text-[var(--primary-600)] font-medium transition-colors">
              添加新孩子
            </span>
          </div>
        </button>

        {/* Kids Grid */}
        {state.kids.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-tertiary)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              开始记录孩子的成长
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              添加第一个孩子，开始积分奖励之旅
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              添加孩子
            </button>
          </div>
        ) : (
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
        )}

        {/* Rules Section */}
        <div className="mt-12 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
            规则说明
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-[var(--text-secondary)] mb-3">积分获取</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]"/>
                  校级以上比赛优秀 +10分
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]"/>
                  校内老师书面表扬 +3分
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]"/>
                  每周家庭卫生干净 +1分
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]"/>
                  按时完成所有作业 +1分
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[var(--text-secondary)] mb-3">积分扣除</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger-500)]"/>
                  校内批评 -3分
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger-500)]"/>
                  检讨 -6分（重复加倍）
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger-500)]"/>
                  家庭卫生特别脏 -1分
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger-500)]"/>
                  两次以上未完成作业 -1分
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
            <h4 className="font-medium text-[var(--text-secondary)] mb-3">奖励兑换</h4>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-[var(--primary-50)] text-[var(--primary-700)] text-xs font-medium rounded-full">
                10分 = 礼品/娱乐
              </span>
              <span className="px-3 py-1.5 bg-[var(--primary-50)] text-[var(--primary-700)] text-xs font-medium rounded-full">
                100分 = 购物/旅游
              </span>
              <span className="px-3 py-1.5 bg-[var(--primary-50)] text-[var(--primary-700)] text-xs font-medium rounded-full">
                300分 = 远途七日游
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-[var(--text-tertiary)]">
          <p>数据保存在本地浏览器中，请定期导出备份</p>
        </footer>
      </main>

      <AddKidModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addKid}
      />
    </div>
  );
}

export default App;
