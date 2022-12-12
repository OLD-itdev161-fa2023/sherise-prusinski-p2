import axios from "axios"

const ENDPOINT = "localhost"
const ENDPOINT_PORT = 8081;
const ROOT_URL = "http://"+ ENDPOINT +":" + ENDPOINT_PORT;
const API_URL = ROOT_URL + "/api";
const TASKS_API_URL = API_URL + "/tasks/";
const AUTH_API_URL = API_URL + "/auth/";

async function createTask(task) {
    try {
        const _userId = localStorage.getItem('_userId');

        const params = JSON.stringify({
            "_userId": _userId,
            "taskDescription": task, 
            "completed": false
        });

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };
        const response = await axios.post(TASKS_API_URL, params,config);
        if (response.status === 400 || response.status === 422) {
            throw new Error(response.data.errors.msg);
        } else {
            return response.data;
        }
    } catch (exception) {
        alert("Error :" + exception);
    }

    return null;
}

async function deleteTask(id) {
    const token = localStorage.getItem('token');

    try {
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
    
            const message = await axios.delete(`${TASKS_API_URL}${id}`, config);
            return message;
        }
    } catch (exception) {
        alert("Error :" + exception);
    }
    
    return null;
}

async function updateTask(id, payload) {
    const token = localStorage.getItem('token');

    try {
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
        const { data: newTask } = await axios.put(`${TASKS_API_URL}${id}`, payload, config);
        return newTask;
        }
    } catch (exception) {
        alert("Error :" + exception);
    }

    return null;
}

async function getTasks() {
    const token = localStorage.getItem('token');

    try {
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
    
            const { data: tasks } = await axios.get(TASKS_API_URL, config);
            return tasks;
        }
    } catch (exception) {
        alert("Error :" + exception);
    }

    return null;
}

export default { ROOT_URL, API_URL, TASKS_API_URL, AUTH_API_URL, createTask, deleteTask, updateTask, getTasks }