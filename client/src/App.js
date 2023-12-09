import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:5000/todos/add', { title: newTodo })
            .then(response => {
                console.log(response.data);
                setTodos([...todos, { title: newTodo, completed: false }]);
                setNewTodo('');
            })
            .catch(error => console.error('Error adding todo: ', error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(response => {
                console.log(response.data);
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(error => console.error('Error deleting todo: ', error));
    };

    const updateTodo = (id) => {
        axios.post(`http://localhost:5000/todos/update/${id}`, {
            title: newTodo,
            completed: !todos.find(todo => todo._id === id).completed
        })
            .then(response => {
                console.log(response.data);
                setTodos(todos.map(todo => {
                    if (todo._id === id) {
                        todo.title = newTodo;
                        todo.completed = !todo.completed;
                    }
                    return todo;
                }));
                setNewTodo('');
            })
            .catch(error => console.error('Error updating todo: ', error));
    };

    return (
        <div className="App">
            <h1>MERN ToDo App</h1>
            <div>
                <input
                    type="text"
                    placeholder="New ToDo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodo}>Add ToDo</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo._id)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
