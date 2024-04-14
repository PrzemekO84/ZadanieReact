import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTask = text => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addTask(inputText);
    setInputText('');
  };

  const activeTaskCount = tasks.filter(task => !task.completed).length;
  const completedTaskCount = tasks.filter(task => task.completed).length;

  return (
    <div id='container'>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul id="list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <div className="task-details">
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleTask(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Active tasks: {activeTaskCount}</p>
      <p>Completed tasks: {completedTaskCount}</p>
    </div>
  );
}

export default TodoList;
