import axios from "axios"

const API_URL = "http://localhost:8081/api";
const TASKS_API_URL = API_URL + "/tasks/";
const AUTH_API_URL = API_URL + "/auth/";

async function createTask(task) {
    const params = JSON.stringify({
        "taskDescription": task, 
        "completed": false
    });

    try {
        const response = await axios.post(TASKS_API_URL, params, {
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
    const message = await axios.delete(`${TASKS_API_URL}${id}`)
    return message
}

async function updateTask(id, payload) {
    const { data: newTask } = await axios.put(`${TASKS_API_URL}${id}`, payload)
    return newTask
}

async function getTasks() {
    const { data: tasks } = await axios.get(TASKS_API_URL)
    return tasks
}

async function authenticateUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.removeItem('user');
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }
      axios.get(AUTH_API_URL, config)
        .then((response) => {
          localStorage.setItem('user', response.data.name);
          this.setState(
            {
              user: response.data.name,
              token: token
            },
            () => {
              this.loadData();
            }
          );
        })
        .catch((error) => {
          localStorage.removeItem('user');
          this.setState({ user: null });
          console.error(`Error logging in : ${error}`);
        })
    }
    return token;
  }

export default { createTask, deleteTask, updateTask, getTasks, authenticateUser }