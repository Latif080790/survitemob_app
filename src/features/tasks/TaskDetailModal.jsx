import { X, Paperclip, Camera, Map, Edit, Check } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  onAnnotate,
  onViewPlan,
  onSimulateUpload,
  isUploading,
  notes, 
  setNotes
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-end animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-md rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-full duration-500">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">Detail Pekerjaan</h2>
          <button onClick={onClose} className="text-slate-400"><X /></button>
        </div>

        <div className="overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="font-bold text-white text-lg mb-1">{task.name}</h3>
            <p className="text-slate-400 text-sm mb-2">Lokasi: {task.location}</p>
            <StatusBadge status={task.status} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700 rounded-lg p-3 text-center">
                <p className="text-sm text-slate-400 mb-1">Kondisi Awal</p>
                <div className="w-full h-24 bg-slate-600 rounded flex items-center justify-center">
                    <Paperclip className="w-6 h-6 text-slate-500" />
                </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 text-center">
                <p className="text-sm text-slate-400 mb-1">Hasil Kerja</p>
                {task.resultImage ? (
                  <img src={task.resultImage} alt="Hasil Kerja" className="w-full h-24 object-cover rounded" onClick={() => onAnnotate(task.resultImage)} />
                ) : (
                  <div className="w-full h-24 bg-slate-600 rounded flex items-center justify-center border-2 border-dashed border-slate-500">
                    <Camera className="w-6 h-6 text-slate-500" />
                  </div>
                )}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">Catatan Lapangan</label>
            <textarea 
              className="w-full bg-slate-700 rounded-md p-2 text-slate-200 text-sm resize-none h-24 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="Tambahkan catatan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

        </div>

        <div className="p-4 bg-slate-800 border-t border-slate-700 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onViewPlan}
              className="w-full bg-slate-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center active:bg-slate-600 transition-colors">
              <Map className="w-4 h-4 mr-2" />
              Lihat Denah
            </button>
            {task.resultImage && (
              <button 
                onClick={() => onAnnotate(task.resultImage)}
                className="w-full bg-slate-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center active:bg-slate-600 transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Anotasi
              </button>
            )}
          </div>

          {task.status !== 'Done' && (
            <button
              onClick={onSimulateUpload}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3.5 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Tandai Selesai & Upload
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
