# Task list management application

<b>Project Description:</b>

Project 1 - TaskKeeper Application

This is a TaskKeeper application which allows any user to manage tasks.

This application will provide following functionalities :
1) Adding a new task
2) Getting all tasks
3) Deleting a task
4) Updating a task

<b>Feature List : </b>

The structure of the project is primarily :
1) back-end    NodeJS, Express and MongoDB based REST APIs
2) front-end   ReactJS based Web UI

back-end will provide the following REST APIs :
1) POST   /tasks       Adding a new task
2) GET    /tasks       Getting all tasks
3) DELETE /tasks/:id   Deleting a task with matching id
4) PUT    /tasks/:id   Updating a task with the matching id

front-end will provide the web user-interface to use these back-end APIs as a user-friendly and intuitive ReactJS based web-application.
Postman REST requests are part of TaskKeeper.postman_collection.json.

Demo :

to run the program go to the repository root directory

1) to run back-end server : npm run back-end
2) to run front-end client : npm run front-end

Screenshots:

1. <b> Postman REST requests</b> <br>
![Alt text](demo/Postman.png?raw=true "Postman REST requests") <br>

2. <b> Adding a new task</b>  : A new task description can be entered in the input textbox and by clicking Add button<br>
![Alt text](demo/AddTask.png?raw=true "Add Task") <br>

3. <b> Get all tasks</b>  : Upon first loading the application already existing tasks can be retrieved<br>
![Alt text](demo/MongoDB.png?raw=true "MongoDB objects") <br>
![Alt text](demo/GetAllTasks.png?raw=true "Get All Tasks") <br>

4. <b> Updating a task</b> : By clicking on task text it can be marked as complete<br>
![Alt text](demo/UpdatedTask.png?raw=true "Updating A Task") <br>

5. <b> Deleting a task</b> By clicking on the X next to it a task can be deleted<br>
![Alt text](demo/DeletedTask.png?raw=true "Deleting A Task") <br>
