import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCalories } from "../hooks/useCalories";

export default function ActivityList() {
  const { state, dispatch, categoryName, isEmptyActivities } = useCalories();

  const formatDate = (date: Date) => {
        const d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('-');
    }

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {isEmptyActivities ? (
          <p className="text-center my-5">No hay actividades aún...</p>
        ) : (
          state.activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between"
            >
              <div className="space-y-2 relative">
                <p
                  className={`relative -top-8 -left-8 px-2 py-2 text-white uppercase font-bold ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                  }`}
                > 
                  {categoryName(activity.category)} -
                  Día: {formatDate(activity.date!)}
                </p>
                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                <p className="font-black text-4xl text-lime-400">
                  {activity.calories} {""}
                  <span>Calorias</span>
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <PencilSquareIcon className="h-8 w-8 text-gray-800" />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activeId",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <TrashIcon className="h-8 w-8 text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
