require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const { createTodo, updateTodo } = require('./types.js');
const { todo } = require('./db.js');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/todo', async (req, res) => {
    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad);
    if (!parsePayLoad.success) {
        res.status(411).json({ msg: 'Wrong Inputs!' });
        return;
    }

    //send to database
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false,
    });

    res.json({ msg: 'Todo created successfully!' });
});

app.get('/api/port', async (req, res) => {
    res.json({ port: PORT });
});

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({ todos });
});

app.put('/completed', async (req, res) => {
    const updatePayLoad = req.body;
    const parsePayLoad = updateTodo.safeParse(updatePayLoad);
    if (!parsePayLoad.success) {
        res.status(411).json({ msg: 'Wrong Inputs!' });
        return;
    }

    //send to database
    try {
        await todo.updateOne(
            {
                _id: req.body.id,
            },
            {
                completed: true,
            }
        );
    } catch (e) {
        res.status(411).json({ msg: 'Wrong Inputs!' });
    }
    res.json({ msg: 'Todo completed successfully!' });
});

app.listen(PORT);
