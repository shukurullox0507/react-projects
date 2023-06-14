import React, { useState } from 'react';
import TodoList from './task-list';
import './task-list.scss'

const App = (): JSX.Element => {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.trim() !== '') {
            setTodos([...todos, text]);
            setText('');
        }
    };

    const handleDelete = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        setCompletedTasks(completedTasks.filter((task) => task !== index));
    };

    const handleComplete = (index: number) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter((task) => task !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };

    const handleReset = () => {
        setTodos([]);
        setCompletedTasks([]);
    };

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <div className="add-todo">
                    <input
                        type="text"
                        placeholder="Enter your task..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </div>
            </form>
            <TodoList todo={todos} completedTasks={completedTasks} onDelete={handleDelete} onComplete={handleComplete} />
            <button className="start-over" onClick={handleReset}>Start Over</button>
        </div>
    );
};

export default App;
