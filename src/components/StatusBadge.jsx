const StatusBadge = ({ status }) => {
  const statusConfig = {
    Pending: {
      dot: 'bg-red-500',
      text: 'text-red-500',
    },
    'On Progress': {
      dot: 'bg-yellow-500',
      text: 'text-yellow-500',
    },
    Done: {
      dot: 'bg-green-500',
      text: 'text-green-500',
    },
  };

  const config = statusConfig[status] || {};

  return (
    <div className="flex items-center text-xs font-semibold">
      <span className={`w-2 h-2 rounded-full ${config.dot} mr-2`}></span>
      <span className={config.text}>{status}</span>
    </div>
  );
};

export default StatusBadge;