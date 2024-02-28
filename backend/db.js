require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CONN_STRING;

mongoose.connect(connectionString);

const todoScheme = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model('todo', todoScheme);

module.exports = {
    todo: todo,
};
