import { useEffect, useMemo } from "react"
import CaloriesForm from "./components/CaloriesForm"
import ActivityList from "./components/ActivityList";
import CaloriesTracker from "./components/CaloriesTracker";
import { useCalories } from "./hooks/useCalories";

function App() {

  const { state, dispatch } = useCalories();

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-20"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-5 px-5">
        <div className="max-w-4xl mx-auto">
          <CaloriesForm />
        </div>
      </section>
      <section className="bg-gray-800 py-8">
        <div className="max-w-4xl mx-auto">
          <CaloriesTracker/>
        </div>
      </section>
      <section className="p-5 mx-auto max-w-12xl">
          <ActivityList />
      </section>
    </>
  );
}

export default App
