import { useState } from 'react';
import { Plus, Utensils } from 'lucide-react';
import {Button } from '../../app/components/Button/index';
import {Input } from '../../app/components/Input/index';



interface AddMealFormProps {
  onAddMeal: (calories: number) => void;
}

const commonMeals = [
  { name: 'Café da Manhã', calories: 400 },
  { name: 'Almoço', calories: 650 },
  { name: 'Jantar', calories: 550 },
  { name: 'Lanche', calories: 200 },
];

export function AddMealForm({ onAddMeal }: AddMealFormProps) {
  const [calories, setCalories] = useState('');
  const [mealName, setMealName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calories && parseInt(calories) > 0) {
      onAddMeal(parseInt(calories));
      setCalories('');
      setMealName('');
    }
  };

  const handleQuickAdd = (cal: number) => {
    onAddMeal(cal);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Utensils className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Adicionar Refeição</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Refeição
          </label>
          <Input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Ex: Café da manhã"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Calorias (kcal)
          </label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="400"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </form>

      <div className="border-t pt-4">
        <p className="text-xs font-medium text-gray-600 mb-2">Adicionar Rapidamente:</p>
        <div className="grid grid-cols-2 gap-2">
          {commonMeals.map((meal) => (
            <Button
              key={meal.name}
              onClick={() => handleQuickAdd(meal.calories)}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors border border-blue-200"
            >
              <div className="font-medium">{meal.name}</div>
              <div className="text-blue-600">{meal.calories} kcal</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
