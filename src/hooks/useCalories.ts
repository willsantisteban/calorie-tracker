import { useContext } from "react"
import { CaloriesContext } from "../context/CaloriesContext"

export const useCalories = () => {
    const context = useContext(CaloriesContext);
    if(!context) {
        throw new Error('useCalories must be use within a CaloriesProvider');
    }
    return context;
}