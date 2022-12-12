import axios from "axios"

const API_URL = "http://localhost:8081/api/tasks/"

async function createTask(task) {
    const params = JSON.stringify({
        "taskDescription": task, 
        "completed": false
    });

    try {
        const response = await axios.post(API_URL, params, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 400 || response.status === 422) {
            throw new Error(response.data.errors.msg);
        } else {
            return response.data;
        }
    } catch (exception) {
        alert("Error :" + exception);
    }
    return params;
}

async function deleteTask(id) {
    const message = await axios.delete(`${API_URL}${id}`)
    return message
}

async function updateTask(id, payload) {
    const { data: newTask } = await axios.put(`${API_URL}${id}`, payload)
    return newTask
}

async function getTasks() {
    const { data: tasks } = await axios.get(API_URL)
    return tasks
}


export default { createTask, deleteTask, updateTask, getTasks }