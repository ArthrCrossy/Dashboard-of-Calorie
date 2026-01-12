import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DayData {
  day: string;
  consumed: number;
  burned: number;
  balance: number;
}

interface TrendChartProps {
  data: DayData[];
}

// Função para obter o dia da semana atual em português
const getDayOfWeek = (): string => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return days[new Date().getDay()];
};

export function TrendChart({ data }: TrendChartProps) {
  const currentDay = getDayOfWeek();
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Balanço Calórico Diário</h3>
      <p className="text-sm text-gray-600 mb-4">
        Valores negativos = déficit (bom para emagrecer) | Valores positivos = excesso
      </p>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="day" 
            stroke="#666"
            style={{ fontSize: '14px' }}
            tick={({ x, y, payload }) => (
              <text 
                x={x} 
                y={y + 15} 
                textAnchor="middle" 
                fill={payload.value === currentDay ? '#8b5cf6' : '#666'}
                fontWeight={payload.value === currentDay ? 'bold' : 'normal'}
                fontSize={14}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis 
            stroke="#666"
            style={{ fontSize: '14px' }}
            label={{ value: 'Balanço (kcal)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px'
            }}
            formatter={(value: number) => {
              const sign = value > 0 ? '+' : '';
              return [`${sign}${value} kcal`, 'Balanço'];
            }}
            labelFormatter={(label) => label === currentDay ? `${label} (Hoje)` : label}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          
          {/* Linha de referência no zero */}
          <ReferenceLine 
            y={0} 
            stroke="#666" 
            strokeDasharray="3 3"
            label={{ value: 'Equilíbrio', position: 'right', fill: '#666', fontSize: 12 }}
          />
          
          {/* Linha de meta (déficit de -500) */}
          <ReferenceLine 
            y={-500} 
            stroke="#22c55e" 
            strokeDasharray="5 5"
            label={{ value: 'Meta: -500 kcal', position: 'right', fill: '#22c55e', fontSize: 12 }}
          />
          
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            name="Balanço Calórico"
            dot={({ cx, cy, payload }) => (
              <circle 
                cx={cx} 
                cy={cy} 
                r={payload.day === currentDay ? 8 : 5} 
                fill={payload.day === currentDay ? '#7c3aed' : '#8b5cf6'}
                stroke={payload.day === currentDay ? '#5b21b6' : 'none'}
                strokeWidth={payload.day === currentDay ? 2 : 0}
              />
            )}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm font-medium text-purple-800 mb-2">📊 Análise da Semana</p>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-purple-600 mb-1">Dias com déficit:</p>
            <p className="text-lg font-bold text-purple-700">
              {data.filter(day => day.balance < 0).length} dias
            </p>
          </div>
          <div>
            <p className="text-purple-600 mb-1">Dias com excesso:</p>
            <p className="text-lg font-bold text-purple-700">
              {data.filter(day => day.balance > 0).length} dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
