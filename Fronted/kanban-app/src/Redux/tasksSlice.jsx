// src/Redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find(task => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.find(task => task.id === id);
      if (task) {
        task.title = title;
      }
    },
    resetTasks: () => initialState,
  },
});

export const { moveTask, addTask, updateTask, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
