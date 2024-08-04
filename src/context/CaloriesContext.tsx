import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activityReducer";
import { Activity } from "../types";
import { categories } from "../data/categories";


type CaloriesContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>,
    caloriesConsumed: number,
    caloriesBorn: number,
    netCalories: number,
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean
}

type CaloriesProviderProps = {
    children: ReactNode
}

export const CaloriesContext = createContext<CaloriesContextProps>({} as CaloriesContextProps);

export const CaloriesProvider = ({children} : CaloriesProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category == 1 ? total + activity.calories : total, 0) ,[state.activities])
    const caloriesBorn = useMemo(() => state.activities.reduce((total, activity) => activity.category == 2 ? total + activity.calories : total, 0) ,[state.activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBorn, [state.activities])
    const categoryName = useMemo(
        () => (category: Activity["category"]) =>
          categories.map((cat) => (cat.id === category ? cat.name : "")),
        [state.activities]
      );
    
      const isEmptyActivities = useMemo(
        () => state.activities.length === 0,
        [state.activities]
      );
    return(
        <CaloriesContext.Provider value={{ state, dispatch, caloriesConsumed, caloriesBorn, netCalories, categoryName, isEmptyActivities }}>
            {children}
        </CaloriesContext.Provider>
    )
}