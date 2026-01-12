interface CalorieCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'yellow';
  subtitle: string;
}

const colorClasses = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500',
};

const textColorClasses = {
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  green: 'text-green-600',
  red: 'text-red-600',
  purple: 'text-purple-600',
  yellow: 'text-yellow-600',
};

const bgColorClasses = {
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  green: 'bg-green-50',
  red: 'bg-red-50',
  purple: 'bg-purple-50',
  yellow: 'bg-yellow-50',
};

export function CalorieCard({ title, value, icon, color, subtitle }: CalorieCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${textColorClasses[color]} mb-2`}>
        {value > 0 && value < 1000 && value !== Math.abs(value) ? '' : value > 0 ? '+' : ''}
        {value} <span className="text-lg">kcal</span>
      </p>
      <p className="text-xs text-gray-500">{subtitle}</p>
      
      {/* Progress bar para consumo vs meta */}
      {title === "Consumidas Hoje" && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${bgColorClasses[color]} h-2 rounded-full transition-all ${colorClasses[color]}`}
              style={{ width: `${Math.min((value / 2000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
