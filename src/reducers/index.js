import { combineReducers } from 'redux';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_LOGOUT,
    FETCH_TASKS,
    FETCH_TASK,
    CHANGE_TASKS_MODE,
    CHANGE_TASKS_SORTING,
    CHANGE_TASKS_FILTER_TEXT
} from '../actions/types';
import { sortArrayOfObjects, filterText } from '../utils/utils';

const initialAuthState = {
    user: undefined,
    authError: ''
};

const initialTasksState = {
    displayMode: 1, //1=short table, 2=extended table, 3=board
    tasks: [],
    processedTasks: [],
    sorting: undefined,
    filters: {} //nameOfTheColumn:value
}

const initialTaskState = null;

function auth(state = initialAuthState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user: action.payload,
                authError: ''
            };
        case LOGIN_FAIL:
            return {
                user: undefined,
                authError: action.payload
            };
        case LOGIN_LOGOUT:
            return initialAuthState;
        default: return state;
    }

}

function task(state = initialTaskState, action) {
    console.log('reduce ', action);

    switch (action.type) {
        case FETCH_TASK:
            return action.payload
        default: 
            return state;
    }

}

function tasks(state = initialTasksState, action) {
    console.log('reduce ', action);


    switch (action.type) {
        case FETCH_TASKS:
         
            return {
                ...state,
                tasks: action.payload,
                processedTasks: processFiltersAndSort(action.payload, state.filters, state.sorting) 
            };

        case CHANGE_TASKS_MODE:
            return {
                ...state,
                displayMode: action.payload
            }
        case CHANGE_TASKS_SORTING:
            return {
                ...state,
                processedTasks: sortArrayOfObjects(state.processedTasks, action.payload.sortProp, action.payload.asc),
                sorting: action.payload
            }
        case CHANGE_TASKS_FILTER_TEXT:

            let newFilters = { ...state.filters, [action.payload.field] : action.payload.text};

            return {
                ...state,
                filters: newFilters,
                processedTasks: processFiltersAndSort(state.tasks,newFilters,state.sorting)
            }
        default: return state;
    }

}



const processFiltersAndSort = (data,filters,sorting) => {

    let filteredTasksPayload = filterText(data, filters);

    let processedTasksPayload = sorting ? 
        sortArrayOfObjects(filteredTasksPayload, sorting.sortProp, sorting.asc) 
    : filteredTasksPayload;

    return processedTasksPayload;
}



export default combineReducers({
    auth,
    tasks,
    task
});