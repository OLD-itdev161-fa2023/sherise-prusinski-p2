import React from "react"
import './App.css';
import api from "./api"
import axios from "axios"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends React.Component {

  state = {
    tasks: [],
    task: null,
    taskDesc: null,
    token: null,
    user: null
  };

  componentDidMount() {
    axios.get(api.ROOT_URL)
    .then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    })

    this.authenticateUser();
  }

  createTask = async e => {
    e.preventDefault()
    const newTask = await api.createTask(this.state.taskDesc)
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
  }

  deleteTask = async (e, id) => {
    try {
      e.stopPropagation();
      await api.deleteTask(id);
      this.setState({
        tasks: [...this.state.tasks.filter(({ _id: i }) => id !== i)]
      });
    } catch (err) { }
  }

  updateTask = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !this.state.tasks.find(task => task._id === id).completed,
    }
    const updatedTask = await api.updateTask(id, payload)
    this.setState({
      tasks: [...this.state.tasks.map(task => (task._id === id ? updatedTask : task))]
    })
  }

  authenticateUser = () => {
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
      axios.get(api.AUTH_API_URL, config)
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
  }

  loadData = () => {
    const { token } = this.state;
    const fetchTaskAndSetTasks = async () => {
      const fetchedTasks = await api.getTasks()
      this.setState({
        tasks: fetchedTasks
      })
    }

    if (token) {
      fetchTaskAndSetTasks()
      console.log("Loaded tasks : " + this.state.tasks);
    }
  }

  logOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null, token: null, tasks:[], task:null, taskDesc: null });
  }

  render() {
    const token = localStorage.getItem('token');
    let { user, tasks, taskDesc } = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser
    };

    return (
      <Router>
        <div className="App" >
          <header className="App-header">
            <h1>TaskKeeper</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                {user ? (
                  <Link to="/new-task">New Task</Link>
                ) : (
                  <Link to="/register">Register</Link>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="" onClick={this.logOut}>Log out</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </header>
          <main>
            <Routes>
              <Route exact path="/" element= {
                user ? (
                  <div>
                    <input
                      id="task-input"
                      type="text"
                      value={taskDesc}
                      onChange={({ target }) => this.setState({ taskDesc: target.value })}
                    />
                    <button type="button" onClick={this.createTask}>
                      Add
                    </button>
                    <ul>
                      {tasks.map(({ _id, taskDescription, completed }, i) => (
                        <li key={i}
                          onClick={e => this.updateTask(e, _id)}
                          className={completed ? "completed" : "pending"}
                        >
                          {taskDescription}
                          <span onClick={e => this.deleteTask(e, _id)}>X</span>
                        </li>
                      ))}
                    </ul>
                  </div> ) : (<div><h3>Please Register or Login</h3></div>)
              }>
              </Route>
              <Route
                exact
                path="/register"
                element={ <Register {...authProps} />}
              />
              <Route
                exact
                path="/login"
                element={ <Login {...authProps} />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
