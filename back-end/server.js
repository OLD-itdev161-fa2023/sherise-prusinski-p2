const connectDatabase = require("./config/db") //database server
const express = require("express") // express application server
const app = express() // generate an app object
const expressValidator = require('express-validator') //to validate incoming requests
const Task = require("./models/task");
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 8081 // port that the server is running on => localhost:8081
app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload

//Configure Middleware
const cors = require('cors');
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:8080'
    })
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

connectDatabase(); //Connect to mongoDB database

function success(res, payload) {
    return res.status(200).json(payload)
}

//API endpoints
app.get('/', (req, res) =>
    /**
     * @route GET /
     * @desc Test endpoint
     */
    res.send('TaskKeeper back-end up-and-running!')
);

/**
* @route POST /tasks
* @desc Add a new task
*/
app.post(
    "/tasks",
    [
        expressValidator.check('taskDescription', 'Please enter task description')
            .not()
            .isEmpty(),
        expressValidator.check('completed', 'Please enter is task completed')
            .not()
            .isEmpty(),
    ],
    async (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            try {
                const { taskDescription, completed } = req.body;
                //Check if task exists
                let task = await Task.findOne({ taskDescription: taskDescription });
                if (task) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Task already exists' }] });
                }
                task = await Task.create(req.body);
                let payload = await Task.findOne({ taskDescription: taskDescription });
                return success(res, payload);
            } catch (exception) {
                console.log(exception);
                next({ status: 400, message: "Failed to create task due to error : " + exception })
            }
        }
    }
);

/**
* @route GET 
* @desc Get all tasks
*/
app.get("/tasks", async (req, res, next) => {
    try {
        const tasks = await Task.find({})
        return success(res, tasks)
    } catch (exception) {
        next({ status: 400, message: "failed to get tasks due to error : " + exception })
    }
})

/**
* @route DELETE 
* @desc Delete a task
*/
app.delete("/tasks/:id", async (req, res, next) => {
    try {
        await Task.findByIdAndRemove(req.params.id)
        return success(res, "Task deleted!")
    } catch (exception) {
        next({ status: 400, message: "failed to delete task" })
    }
})

/**
* @route PUT 
* @desc Update a task as completed
*/
app.put("/tasks/:id", async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return success(res, task)
    } catch (exception) {
        next({ status: 400, message: "failed to update task" })
    }
})

app.use((error, req, res, next) => {
    return res.status(error.status || 400).json({
        status: error.status || 400,
        message: error.message || "there was an error processing request",
    })
})

app.listen(PORT, () => {
    // listening on port
    console.log(`listening on port ${PORT}`) // print this when the server starts
})