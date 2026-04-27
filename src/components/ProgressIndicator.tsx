
interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressIndicator({ current, total, label }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-blue-700">{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-600 to-teal-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
