import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DayData {
  day: string;
  consumed: number;
  burned: number;
  balance: number;
}

interface WeeklyChartProps {
  data: DayData[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Consumo vs Gasto Semanal</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stzzroke="#e0e0e0" />
          <XAxis 
            dataKey="day" 
            stroke="#666"
            style={{ fontSize: '14px' }}
          />
          <YAxis 
            stroke="#666"
            style={{ fontSize: '14px' }}
            label={{ value: 'Calorias (kcal)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px'
            }}
            formatter={(value: number) => [`${value} kcal`, '']}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar 
            dataKey="consumed" 
            fill="#3b82f6" 
            name="Consumidas"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="burned" 
            fill="#f97316" 
            name="Gastas"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-blue-600 font-medium mb-1">Total Consumido</p>
          <p className="text-lg font-bold text-blue-700">
            {data.reduce((sum, day) => sum + day.consumed, 0).toLocaleString()} kcal
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <p className="text-xs text-orange-600 font-medium mb-1">Total Gasto</p>
          <p className="text-lg font-bold text-orange-700">
            {data.reduce((sum, day) => sum + day.burned, 0).toLocaleString()} kcal
          </p>
        </div>
      </div>
    </div>
  );
}
