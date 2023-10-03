// create an express todod server
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Todo = require('./Model/todo.model');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 9000;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) => {
    res.send('Hello World!');
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        console.log(error.message);
    }
})

app.post("/todos",async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.send(todo);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, () => {
    console.log('Listening on port 9000');
})