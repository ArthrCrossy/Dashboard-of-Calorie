import { useState } from 'react';
import { CalorieCard } from './components/CalorieCard';
import { WeeklyChart } from './components/WeeklyChart';
import { AddMealForm } from './components/AddMealForm';
import { AddActivityForm } from './components/AddActivityForm';
import { TrendChart } from './components/TrendChart';
import { Activity, Apple, TrendingDown, Target } from 'lucide-react';
import ChartExample from "./WeekChart";

interface DayData {
  day: string;
  consumed: number;
  burned: number;
  balance: number;
}

export default function App() {
  const [weekData, setWeekData] = useState<DayData[]>([
    { day: 'Seg', consumed: 1850, burned: 2200, balance: -350 },
    { day: 'Ter', consumed: 2100, burned: 2300, balance: -200 },
    { day: 'Qua', consumed: 1950, burned: 2150, balance: -200 },
    { day: 'Qui', consumed: 2200, burned: 2100, balance: 100 },
    { day: 'Sex', consumed: 1800, burned: 2400, balance: -600 },
    { day: 'Sáb', consumed: 2300, burned: 1900, balance: 400 },
    { day: 'Dom', consumed: 1900, burned: 2000, balance: -100 },
  ]);


  const [todayConsumed, setTodayConsumed] = useState(1900);
  const [todayBurned, setTodayBurned] = useState(2000);
  
  const dailyGoal = 2000; // Meta de consumo
  const targetDeficit = 500; // Déficit alvo para emagrecer
  const todayBalance = todayConsumed - todayBurned;
  
  // Calcula médias semanais
  const avgConsumed = Math.round(weekData.reduce((sum, day) => sum + day.consumed, 0) / weekData.length);
  const avgBurned = Math.round(weekData.reduce((sum, day) => sum + day.burned, 0) / weekData.length);
  const avgBalance = Math.round(weekData.reduce((sum, day) => sum + day.balance, 0) / weekData.length);

  const handleAddMeal = (calories: number) => {
    setTodayConsumed(prev => prev + calories);
  };

  const handleAddActivity = (calories: number) => {
    setTodayBurned(prev => prev + calories);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard de Calorias</h1>
          <p className="text-gray-600">Acompanhe seu progresso de emagrecimento</p>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <CalorieCard
            title="Consumidas Hoje"
            value={todayConsumed}
            icon={<Apple className="w-6 h-6" />}
            color="blue"
            subtitle={`Meta: ${dailyGoal} kcal`}
          />
          <CalorieCard
            title="Gastas Hoje"
            value={todayBurned}
            icon={<Activity className="w-6 h-6" />}
            color="orange"
            subtitle="Atividades + Metabolismo"
          />
          <CalorieCard
            title="Balanço Hoje"
            value={todayBalance}
            icon={<TrendingDown className="w-6 h-6" />}
            color={todayBalance <= -targetDeficit ? 'green' : todayBalance < 0 ? 'yellow' : 'red'}
            subtitle={todayBalance < 0 ? 'Déficit (Bom!)' : 'Excesso'}
          />
          <CalorieCard
            title="Meta de Déficit"
            value={-targetDeficit}
            icon={<Target className="w-6 h-6" />}
            color="purple"
            subtitle="Para emagrecer saudável"
          />
        </div>

        {/* Gráficos e Formulários */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico Semanal */}
          <div className="lg:col-span-2">
            <WeeklyChart data={weekData} />
          </div>

          {/* Formulários de Entrada */}
          <div className="space-y-4">
            <AddMealForm onAddMeal={handleAddMeal} />
            <AddActivityForm onAddActivity={handleAddActivity} />
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Gráfico em destaque */}
              <div className="lg:col-span-2 order-first">
                  <h1>OIIIIIIIIIIIIIIIIIIIIIIIIIIIII</h1>
                  <ChartExample />
              </div>

              <CalorieCard title={""} value={0} icon={undefined} color={"blue"} subtitle={""} />
              <CalorieCard title={""} value={0} icon={undefined} color={"blue"} subtitle={""} />
              <CalorieCard title={""} value={0} icon={undefined} color={"blue"} subtitle={""} />
              <CalorieCard title={""} value={0} icon={undefined} color={"blue"} subtitle={""} />

          </div>


          {/* Gráfico de Tendência */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendChart data={weekData} />
          </div>

          {/* Card de Resumo Semanal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumo Semanal</h3>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600 mb-1">Média Consumida</p>
                <p className="text-2xl font-bold text-blue-600">{avgConsumed} kcal</p>
              </div>
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600 mb-1">Média Gasta</p>
                <p className="text-2xl font-bold text-orange-600">{avgBurned} kcal</p>
              </div>
              
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600 mb-1">Balanço Médio</p>
                <p className={`text-2xl font-bold ${avgBalance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {avgBalance > 0 ? '+' : ''}{avgBalance} kcal
                </p>
              </div>
              <div className="pt-2">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-2">💡 Dica de Emagrecimento</p>
                  <p className="text-xs text-green-700">
                    {avgBalance < -300 
                      ? 'Ótimo! Você está mantendo um déficit saudável. Continue assim!'
                      : avgBalance < 0
                      ? 'Bom progresso! Tente aumentar um pouco a atividade física.'
                      : 'Atenção! Você está consumindo mais do que gasta. Ajuste sua dieta ou aumente exercícios.'}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
