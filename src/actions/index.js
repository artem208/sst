import AuthProvider from '../providers/auth-provider';
import TasksProvider from '../providers/tasks-provider';
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_LOGOUT,
    FETCH_TASKS,
    CHANGE_TASKS_MODE,
    CHANGE_TASKS_SORTING,
    CHANGE_TASKS_FILTER_TEXT, 
    FETCH_TASK
 } from './types';

const AUTH_TOKEN_KEY = 'auth-token';

export const authenticateUser = (userName, password) => {

    return (dispatch) => { 
        AuthProvider.authenticate(userName, password)
            .then(
                (data) => {
                    window.localStorage.setItem(AUTH_TOKEN_KEY,data.authToken);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data
                    });
                },
                (data) => {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: data
                    })
                }
            );
    }

}

export const checkAuthToken = () => {

    return (dispatch) => {

        const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

        AuthProvider.getCurrentUser(token)
            .then(
                (data) => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data
                    });
                },
                (data) => {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: data
                    })
                }
            );
    }
}

export const logOut = () => {

    window.localStorage.removeItem(AUTH_TOKEN_KEY);

    return {
        type: LOGIN_LOGOUT,
        payload: ''
    }

}

export const fetchTasks = (authToken) => {
    return (dispatch) => { 
        TasksProvider.fetchTasks(authToken)
            .then(
                (data) => {
                    dispatch({
                        type: FETCH_TASKS,
                        payload: data.tasks
                    });
                },
                (data) => {
                    dispatch({
                        type: FETCH_TASKS,
                        payload: []
                    })
                }
            );
    }
}

export const changeTasksDisplayMode = (mode) => {
    return {
        type: CHANGE_TASKS_MODE,
        payload: mode
    }
}

export const changeTasksSorting = (newSorting) => {
    return {
        type: CHANGE_TASKS_SORTING,
        payload: newSorting
    }
}

export const setFilterText = (field, text) => {
    return {
        type: CHANGE_TASKS_FILTER_TEXT,
        payload: { field, text}
    }
}

export const fetchTask = (authToken, taskId) => {

    return (dispatch) => { 
        TasksProvider.fetchTask(authToken, taskId)
            .then(
                (data) => {
                    dispatch({
                        type: FETCH_TASK,
                        payload: data.task
                    });
                },
                (data) => {
                    dispatch({
                        type: FETCH_TASK,
                        payload: null
                    })
                }
            );
    }

}