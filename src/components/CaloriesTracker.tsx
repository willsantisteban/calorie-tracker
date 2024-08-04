import CaloriesDisplay from "./CaloriesDisplay";
import { useCalories } from "../hooks/useCalories";

export default function CaloriesTracker() {
 
  const { caloriesConsumed, caloriesBorn, netCalories } = useCalories();

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloriesDisplay calories={caloriesConsumed} text="Consumidas"/>
            <CaloriesDisplay calories={caloriesBorn} text="Ejercicio"/>
            <CaloriesDisplay calories={netCalories} text="Diferencia"/>
        </div>
    </>
  )
}
