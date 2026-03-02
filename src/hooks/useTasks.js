import { useState, useMemo } from 'react';

const initialTasks = [
  { name: 'Pondasi & Struktur Bawah', location: 'Area A1', pic: 'Tim A', status: 'Done' },
  { name: 'Pemasangan Dinding & Partisi', location: 'Lantai 1', pic: 'Tim B', status: 'Done' },
  { name: 'Instalasi Listrik & Plumbing', location: 'Seluruh Gedung', pic: 'Tim C', status: 'On Progress' },
  { name: 'Pemasangan Kusen & Jendela', location: 'Lantai 1 & 2', pic: 'Tim D', status: 'On Progress' },
  { name: 'Pekerjaan Atap & Waterproofing', location: 'Atap', pic: 'Tim A', status: 'Pending' },
  { name: 'Finishing Dinding (Plester & Cat)', location: 'Lantai 1', pic: 'Tim E', status: 'Pending' },
  { name: 'Pemasangan Lantai Keramik', location: 'Area Lobby', pic: 'Tim B', status: 'Pending' },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'All') return tasks;
    return tasks.filter(task => task.status === activeFilter);
  }, [tasks, activeFilter]);

  const progressStats = useMemo(() => {
    const completedTasks = tasks.filter(task => task.status === 'Done').length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return { completedTasks, totalTasks, progress };
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTaskStatus = (taskNameToUpdate, newStatus, resultImage = null) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.name === taskNameToUpdate ? { ...task, status: newStatus, resultImage } : task
      )
    );
  };

  return {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    progressStats,
    handleAddTask,
    updateTaskStatus,
  };
};
