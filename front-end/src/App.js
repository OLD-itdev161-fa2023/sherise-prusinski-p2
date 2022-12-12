import React, { useState, useEffect } from "react"
import './App.css';
import api from "./api"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends React.Component {
  state = {
    tasks: [],
    task: null,
    taskDesc: null
  };

  componentDidMount() {
    const fetchTaskAndSetTasks = async () => {
      const fetchedTasks = await api.getTasks()
      this.setState({
        tasks: fetchedTasks
      })
    }
    fetchTaskAndSetTasks()
  }

  createTask = async e => {
    e.preventDefault()
    const newTask = await api.createTask(this.state.taskDesc)
    this.setState({
      tasks:[...this.state.tasks, newTask]
    })
  }

  deleteTask = async (e, id) => {
    try {
      e.stopPropagation()
      await api.deleteTask(id)
      this.setState({
        tasks:[...this.state.tasks.filter(({ _id: i }) => id !== i)]
      })
    } catch (err) { }
  }

  updateTask = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !this.state.tasks.find(task => task._id === id).completed,
    }
    const updatedTask = await api.updateTask(id, payload)
    this.setState({
      tasks:[...this.state.tasks.map(task => (task._id === id ? updatedTask : task))]
    })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          TaskKeeper
        </header>
        <div>
          <input
            id="task-input"
            type="text"
            value={this.state.taskDesc}
            onChange={({ target }) => this.setState({task:target.value})}
          />
          <button type="button" onClick={this.createTask}>
            Add
          </button>
          <ul>
            {this.state.tasks.map(({ _id, taskDescription, completed }, i) => (
              <li key={i}
                onClick={e => this.updateTask(e, _id)}
                className={completed ? "completed" : "pending"}
              >
              {taskDescription}
              <span onClick={e => this.deleteTask(e, _id)}>X</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
