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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">添加新孩子</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">孩子姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">年级</label>
            <input
              type="text"
              placeholder="例如：五年级"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">学期</label>
            <input
              type="text"
              placeholder="例如：下学期"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
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
