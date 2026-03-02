import { ChevronRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const TaskList = ({ tasks, onTaskClick }) => (
  <div className="space-y-3 px-4 py-3">
    {tasks.map((task, index) => (
      <div
        key={index}
        onClick={() => onTaskClick(task)}
        className="bg-slate-800 p-4 rounded-lg shadow-lg flex justify-between items-center active:scale-95 transition-transform duration-150"
      >
        <div>
          <h3 className="font-bold text-white text-md mb-1">{task.name}</h3>
          <StatusBadge status={task.status} />
        </div>
        <ChevronRight className="text-slate-500" />
      </div>
    ))}
  </div>
);

export default TaskList;
