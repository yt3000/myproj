import { useState } from "react";
import type { Kid } from "../types";

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (kid: Kid) => void;
}

export const AddKidModal = ({ isOpen, onClose, onAdd }: AddKidModalProps) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKid: Kid = {
      id: crypto.randomUUID(),
      name,
      grade,
      semester,
      totalScore: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    onAdd(newKid);
    setName("");
    setGrade("");
    setSemester("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-light)] animate-scale-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--border-light)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              添加新孩子
            </h3>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              孩子姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：小明"
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              年级
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="例如：五年级"
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              学期
            </label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="例如：下学期"
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Actions */}
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
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
