import { useRef, useEffect, useState } from 'react';
import { X, Trash2, Redo, Undo } from 'lucide-react';

const AnnotationCanvas = ({ isOpen, onClose, imageSrc }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (isOpen && imageSrc) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        // Adjust canvas to image aspect ratio
        const aspectRatio = image.width / image.height;
        const canvasWidth = canvas.parentElement.offsetWidth;
        const canvasHeight = canvasWidth / aspectRatio;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        saveState();
      };
    }
  }, [isOpen, imageSrc]);

  const saveState = () => {
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const restoreState = (index) => {
    if (index < 0 || index >= history.length) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = history[index];
    image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = '#ef4444'; // red-500
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const context = canvasRef.current.getContext('2d');
    context.closePath();
    setIsDrawing(false);
    saveState();
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        restoreState(newIndex);
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        restoreState(newIndex);
    }
  }
  
  const handleClear = () => {
    if(history.length > 0) {
        setHistoryIndex(0);
        restoreState(0);
        const canvas = canvasRef.current;
        const newHistory = [canvas.toDataURL()];
        setHistory(newHistory);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col animate-in fade-in duration-300">
      <div className="p-4 bg-slate-900 flex justify-between items-center w-full">
        <h2 className="text-lg font-bold text-white">Anotasi Gambar</h2>
        <div className="flex items-center gap-2">
            <button onClick={handleUndo} className="text-slate-400 p-2 rounded-full bg-slate-800 disabled:opacity-50" disabled={historyIndex <= 0}><Undo size={20}/></button>
            <button onClick={handleRedo} className="text-slate-400 p-2 rounded-full bg-slate-800 disabled:opacity-50" disabled={historyIndex >= history.length - 1}><Redo size={20}/></button>
            <button onClick={handleClear} className="text-slate-400 p-2 rounded-full bg-slate-800"><Trash2 size={20} /></button>
            <button onClick={onClose} className="text-slate-400 p-2 rounded-full bg-slate-800 ml-4"><X size={24} /></button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default AnnotationCanvas;
