# Task list management application

<b>Project Description:</b>

Project 2 - TaskKeeper Application

This is a TaskKeeper application which allows any user to manage tasks.
Each user can have their own set of tasks without duplicate task descriptions within individual tasklist.

This application will provide following functionalities :
1) Adding a new task
2) Getting all tasks
3) Deleting a task
4) Updating a task
5) Login for a user
6) Register as a new user
7) Logout for a user

<b>Feature List : </b>

The structure of the project is primarily :
1) back-end    NodeJS, Express and MongoDB based REST APIs
2) front-end   ReactJS based Web UI

back-end will provide the following REST APIs :
1) POST   /api/tasks       Adding a new task
          /api/login       To login as a user
          /api/users       To register as a user
2) GET    /api/tasks       Getting all tasks
          /api/auth       To authenticate user and establish login session
          /                To check if the back-end is up and running
3) DELETE /api/tasks/:id   Deleting a task with matching id
4) PUT    /api/tasks/:id   Updating a task with the matching id


front-end will provide the web user-interface to use these back-end APIs as a user-friendly and intuitive ReactJS based web-application.
back-end runs on http://localhost:8081 endpoint
front-end runs on httpL//localhost:8080 endpoint
Postman REST requests are part of TaskKeeper.postman_collection.json for both sides of endpoints to test independently of the application.

Demo :

to run the program go to the repository root directory

1) to run back-end server : npm run back-end
2) to run front-end client : npm run front-end

Screenshots:

1. <b> Logging in as a user</b>By clicking on the Login link next to Home and Register links at the right top corner of the screen <br>
![Alt text](demo/Login.png?raw=true "Logging in as a user") <br>

2. <b> Register as a hew user</b>By clicking on the Register between Home and Login links at the right top corner of the screen <br>
![Alt text](demo/Register.png?raw=true "Logging in as a user") <br>

3. <b> Postman REST requests</b> <br>
![Alt text](demo/Postman.png?raw=true "Postman REST requests") <br>

4. <b> Adding a new task</b>  : A new task description can be entered in the input textbox and by clicking Add button<br>
![Alt text](demo/AddTask.png?raw=true "Add Task") <br>

5. <b> Get all tasks</b>  : Upon logging into the application already existing tasks created by user in the completed or non-completed state can be retrieved<br>
![Alt text](demo/GetAllTasks.png?raw=true "Get All Tasks") <br>

6. <b> Updating a task</b> : By clicking on task text it can be marked as complete<br>
![Alt text](demo/UpdatedTask.png?raw=true "Updating A Task") <br>

7. <b> Deleting a task</b> By clicking on the X next to it a task can be deleted<br>
![Alt text](demo/DeletedTask.png?raw=true "Deleting A Task") <br>

8. <b> Logging out as a user</b> By clicking on the Log out link at the right top corner of the screen<br>
![Alt text](demo/GetAllTasks.png?raw=true "Logging out as a user") <br>

9. <b> MongoDB database</b> As per the connection string in back-end/config/default.json and accessed through back-end/config/db.js using models in back-end/models<br>
![Alt text](demo/MongoDB.png?raw=true "MongoDB database") <br>



