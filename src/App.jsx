import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  // 1. Central State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Build a Task App', completed: false },
  ]);
  const [filter, setFilter] = useState('All');

  // 2. Logic: Add Task
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // 3. Logic: Toggle Task (Immutable .map)
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 4. Logic: Delete Task (Immutable .filter)
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 5. Derived State: Filtering
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <main className="task-card">
      <h1>My Tasks</h1>
      
      <TaskInput onAddTask={addTask} />

      <div className="filter-container">
        {['All', 'Active', 'Completed'].map((mode) => (
          <button
            key={mode}
            className={`filter-btn ${filter === mode ? 'active' : ''}`}
            onClick={() => setFilter(mode)}
          >
            {mode}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '1rem' }}>
            No tasks found.
          </p>
        )}
      </ul>
    </main>
  );
}

export default App;
