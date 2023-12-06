import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // Retrieve tasks from localStorage on component mount
  const initialQuadrantTasks = JSON.parse(localStorage.getItem('quadrantTasks')) || {
    urgentImportant: [],
    notUrgentImportant: [],
    urgentNotImportant: [],
    notUrgentNotImportant: [],
  };

  // State to hold tasks for each quadrant
  const [quadrantTasks, setQuadrantTasks] = useState(initialQuadrantTasks);

  // Function to add a task to the specified quadrant
  const addTask = (quadrant, task) => {
    setQuadrantTasks((prevTasks) => ({
      ...prevTasks,
      [quadrant]: [...prevTasks[quadrant], task],
    }));
  };

  // Function to update a task in the specified quadrant
  const updateTask = (quadrant, index, updatedTask) => {
    setQuadrantTasks((prevTasks) => {
      const updatedQuadrant = [...prevTasks[quadrant]];
      updatedQuadrant[index] = updatedTask;
      return {
        ...prevTasks,
        [quadrant]: updatedQuadrant,
      };
    });
  };

  // Function to delete a task from the specified quadrant
  const deleteTask = (quadrant, index) => {
    setQuadrantTasks((prevTasks) => {
      const updatedQuadrant = [...prevTasks[quadrant]];
      updatedQuadrant.splice(index, 1);
      return {
        ...prevTasks,
        [quadrant]: updatedQuadrant,
      };
    });
  };

  // Update localStorage whenever quadrantTasks changes
  useEffect(() => {
    localStorage.setItem('quadrantTasks', JSON.stringify(quadrantTasks));
  }, [quadrantTasks]);

  // Render the UI
  return (
    <main className="app-container">
      <h1>Eisenhower Matrix App ⏰ 🚀
</h1>
      <div className="matrix-container">
        {/* Render each quadrant with headers */}
        {['urgentImportant', 'notUrgentImportant', 'urgentNotImportant', 'notUrgentNotImportant'].map((quadrant) => (
          <div key={quadrant} className={`quadrant ${quadrant}`}>
            <h2>{getQuadrantLabel(quadrant)}</h2>
            <ul>
              {/* Display tasks for the current quadrant */}
              {quadrantTasks[quadrant].map((task, index) => (
                <li key={index}>
                  {task}
                  {/* Add buttons for updating and deleting tasks */}
                  <button className="update-button" onClick={() => updateTask(quadrant, index, prompt('Update Task:', task))}>
                    Update
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(quadrant, index)}>Delete</button>
                </li>
              ))}
            </ul>
            {/* Task input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const taskInput = e.target.elements.task;
                const taskText = taskInput.value.trim();
                if (taskText) {
                  addTask(quadrant, taskText);
                  taskInput.value = '';
                }
              }}
            >
              <input type="text" name="task" placeholder="Add Task" className="placeholder" />
              <button className="add-button" type="submit">Add</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}

// Function to get the label for each quadrant
function getQuadrantLabel(quadrant) {
  const labels = {
    urgentImportant: 'Urgent and Important',
    notUrgentImportant: 'Not Urgent but Important',
    urgentNotImportant: 'Urgent but Not Important',
    notUrgentNotImportant: 'Not Urgent and Not Important',
  };

  return labels[quadrant];
}
