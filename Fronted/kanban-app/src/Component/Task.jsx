import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { updateTask } from '../Redux/tasksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newTitle.trim() !== '') {
      dispatch(updateTask({ id: task.id, title: newTitle.trim() }));
      setIsEditing(false);
    } else {
      alert("Please enter a valid task title");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <li
      ref={drag}
      className={`task-item flex justify-between items-center border border-gray-300 rounded p-2 my-2 bg-white cursor-pointer transition-opacity duration-800 ease-in-out ${isDragging ? 'opacity-50' : ''}`}
    >
      {isEditing ? (
        <input
          type="text"
          className="outline-none focus:outline-none focus:ring-0 text-gray-900 flex-1 px-2 py-1 border border-gray-400 rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyUp={handleKeyPress}
        />
      ) : (
        <>
          <div className="flex-1 text-lg text-gray-800 truncate">{task.title}</div>
          <button
            className="ml-2 p-1 text-red-500 hover:text-red-700"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </>
      )}
      {isEditing && (
        <button
          className="ml-2 p-1 text-blue-500 hover:text-blue-700"
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
      )}
    </li>
  );
};

export default Task;
