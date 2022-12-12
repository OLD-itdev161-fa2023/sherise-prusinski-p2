import React, { useState } from 'react';

const TaskList = props => {
    const { tasks, clickTask, deleteTask } = props;

    return (
        <div>
            {
                <ul>
                    {tasks.map(({ _id, taskDescription, completed, _userId}, i) => (
                        (_userId === user._id &&
                        <li key={i}
                        onClick={e => clickTask(e, _id)}
                        className={completed ? "completed" : "pending"}
                        >
                        <span className="remove" onClick={e => deleteTask(e, _id)}>[Remove]</span>
                        <span> </span>
                        {taskDescription}
                        </li>)
                    ))}
                </ul>
            }
        </div>
    );
};

export default TaskList;