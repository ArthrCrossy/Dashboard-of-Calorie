import { useState } from 'react';
import { Plus, Flame } from 'lucide-react';
import {Button } from '../../app/components/Button/index';
import {Input } from '../../app/components/Input/index';



interface AddActivityFormProps {
  onAddActivity: (calories: number) => void;
}

const commonActivities = [
  { name: 'Caminhada 30min', calories: 150 },
  { name: 'Corrida 30min', calories: 300 },
  { name: 'Musculação 1h', calories: 250 },
  { name: 'Natação 30min', calories: 200 },
];

export function AddActivityForm({ onAddActivity }: AddActivityFormProps) {
  const [calories, setCalories] = useState('');
  const [activityName, setActivityName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calories && parseInt(calories) > 0) {
      onAddActivity(parseInt(calories));
      setCalories('');
      setActivityName('');
    }
  };

  const handleQuickAdd = (cal: number) => {
    onAddActivity(cal);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-800">Adicionar Atividade</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Atividade
          </label>
          <Input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Ex: Caminhada"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Calorias Gastas (kcal)
          </label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="200"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </form>

      <div className="border-t pt-4">
        <p className="text-xs font-medium text-gray-600 mb-2">Adicionar Rapidamente:</p>
        <div className="grid grid-cols-2 gap-2">
          {commonActivities.map((activity) => (
            <Button
              key={activity.name}
              onClick={() => handleQuickAdd(activity.calories)}
              className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-3 rounded-lg transition-colors border border-orange-200"
            >
              <div className="font-medium">{activity.name}</div>
              <div className="text-orange-600">{activity.calories} kcal</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
