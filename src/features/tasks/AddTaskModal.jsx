import { X, Plus } from 'lucide-react';
import { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [pic, setPic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !location || !pic) return;
    onAddTask({ name: taskName, location, pic, status: 'Pending' });
    setTaskName('');
    setLocation('');
    setPic('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-end animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-md rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-full duration-500">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Tambah Pekerjaan Baru</h2>
          <button onClick={onClose} className="text-slate-400"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Nama Pekerjaan</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full bg-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="Contoh: Pemasangan Keramik Lt. 1"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Lokasi</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="Contoh: Area Dapur"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Penanggung Jawab (PIC)</label>
            <input
              type="text"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="w-full bg-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="Contoh: Tim Budi"
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3.5 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />
              Tambahkan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
