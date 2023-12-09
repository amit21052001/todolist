const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern_todo_app');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const todoRoutes = require('./routes/todo');
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// useNewUrlParser: true,
// useUnifiedTopology: true,
