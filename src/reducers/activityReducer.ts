import { Activity } from '../types/index';

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } | 
    { type: 'set-activeId', payload: { id : Activity['id'] } } | 
    { type: 'delete-activeId', payload: { id : Activity['id'] } } | 
    { type: 'restart-app' } 

export type ActivityState = {
    activities : Activity[],
    activeId: string
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
        state : ActivityState = initialState, 
        actions : ActivityActions) => {
    if(actions.type === 'save-activity') {
        let updateActivities: Activity[] = [];
        if(state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? actions.payload.newActivity : activity);
        } else {
            updateActivities = [...state.activities, actions.payload.newActivity]
        }
        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if(actions.type === 'set-activeId') {
        return {
            ...state,
            activeId: actions.payload.id
        }
    }

    if(actions.type === 'delete-activeId') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== actions.payload.id)
        }
    }

    if(actions.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state;
}