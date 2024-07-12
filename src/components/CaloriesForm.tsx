import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import Calendar from "react-calendar";

type CaloriesFormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
  date: new Date()
};

export default function CaloriesForm({ dispatch, state }: CaloriesFormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id == state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  const handleSetDate = (value: string | Date) => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id == state.activeId
      )[0];
      selectedActivity.date = value as Date;
      setActivity(selectedActivity);
    } else {
      setActivity({
        ...initialState,
        date: value as Date,
      });
    }
  };
  
  return (
    <form
      className="space-y-2 bg-white shadow p-5 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="max-w-7xl grid grid-cols-2 mx-auto py-20 md:grid-cols-2">
        <div className="p-5">
          <Calendar
            maxDate={new Date()}
            selectRange={false}
            onChange={(date) => handleSetDate(date as Date)}
            value={activity.date} 
          />
        </div>
        <div className="border border-dashed border-s-teal-300 p-5 rounded-lg space-y-5">
        <div className="">
          <label htmlFor="category">Categoria:</label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Actividad:
          </label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calorias:
          </label>
          <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>
        </div>
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-35"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
