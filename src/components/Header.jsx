import { CheckCircle2 } from 'lucide-react';

const Header = ({ progress, completedTasks, totalTasks }) => (
  <header className="px-4 pt-6 pb-4 bg-slate-900 sticky top-0 z-10">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-bold text-white">Proyek Gedung X</h1>
      <div className="flex items-center text-sm text-green-400 font-semibold">
        <CheckCircle2 className="w-4 h-4 mr-1.5" />
        <span>{`${completedTasks}/${totalTasks} Selesai`}</span>
      </div>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div
        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </header>
);

export default Header;
