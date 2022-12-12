import React, { useState, useEffect } from "react"
import './App.css';
import api from "./api"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  const [tasks, setTasks] = useState([])
  const [taskDesc, setTask] = useState("")
  let task;

  useEffect(() => {
    const fetchTaskAndSetTasks = async () => {
      const tasks = await api.getTasks()
      setTasks(tasks)
    }
    fetchTaskAndSetTasks()
  }, [])

  const createTask = async e => {
    e.preventDefault()
    const newTask = await api.createTask(taskDesc)
    setTasks([...tasks, newTask])
  }

  const deleteTask = async (e, id) => {
    try {
      e.stopPropagation()
      await api.deleteTask(id)
      setTasks(tasks.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }

  const updateTask = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !tasks.find(task => task._id === id).completed,
    }
    const updatedTask = await api.updateTask(id, payload)
    setTasks(tasks.map(task => (task._id === id ? updatedTask : task)))
  }

  return (
    <div className="App" >
      <header className="App-header">
        TaskKeeper
      </header>
      <div>
        <input
          id="task-input"
          type="text"
          value={taskDesc}
          onChange={({ target }) => setTask(target.value)}
        />
        <button type="button" onClick={createTask}>
          Add
        </button>
        <ul>
          {tasks.map(({ _id, taskDescription, completed }, i) => (
            <li key={i}
              onClick={e => updateTask(e, _id)}
              className={completed ? "completed" : "pending"}
            >
              {taskDescription}
              {task} <span onClick={e => deleteTask(e, _id)}>X</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
