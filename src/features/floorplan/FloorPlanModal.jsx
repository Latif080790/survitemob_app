import { X } from 'lucide-react';

const FloorPlanModal = ({ isOpen, onClose, taskLocation }) => {
  if (!isOpen) return null;

  // Dummy positions for demonstration
  const locations = {
    "Dapur": { x: '30%', y: '40%' },
    "Ruang Tamu": { x: '50%', y: '60%' },
    "Kamar Tidur 1": { x: '70%', y: '30%' },
  };

  const position = locations[taskLocation] || { x: '50%', y: '50%' }; // Default to center

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-3xl rounded-lg p-4 relative">
        <h2 className="text-lg font-bold text-white mb-4">Denah Lantai</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400"><X /></button>
        <div className="relative w-full aspect-[4/3] bg-slate-700 rounded-md overflow-hidden">
          {/* Placeholder for floor plan image */}
          <div className="w-full h-full flex items-center justify-center">
            <p className='text-slate-500'>Gambar Denah Lantai</p>
          </div>
          {/* Task location marker */}
          <div 
            className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ left: position.x, top: position.y }}
          >
            <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap'>{taskLocation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanModal;