// src/Component/Board.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Column from './Column';
import { addTask,resetTasks } from '../Redux/tasksSlice';
import '../Style/Board.css';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch(addTask({
        id: Date.now().toString(),
        title: newTaskTitle,
        status: 'pending',
      }));
      setNewTaskTitle('');
    }
  };

  const handleLoginRedirect = () => {
    console.log('clicked');
    dispatch(resetTasks());
    navigate("/login");
  };
 

  const taskPending = tasks.filter(task => task.status === 'pending');
  const tasksInProgress = tasks.filter(task => task.status === 'inprogress');
  const tasksCompleted = tasks.filter(task => task.status === 'completed');

  return (
    <div className="board  ">
      
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          
        />
        <button type="submit">Add Task</button>
        <button
      
        type="button"
        onClick={handleLoginRedirect}
        className="ml-8  text-blue-500 focus:outline-none hover:underline"
      >
        Logout
      </button>
      </form>
      <Column title="Pending" tasks={taskPending} />
      <Column title="inprogress" tasks={tasksInProgress} />
      <Column title="Completed" tasks={tasksCompleted} />
      
    </div>
  );
};

export default Board;
