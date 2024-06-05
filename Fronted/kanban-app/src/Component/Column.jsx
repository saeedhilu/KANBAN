import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { moveTask } from '../Redux/tasksSlice'; 
import Task from './Task';

const Column = ({ title, tasks }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (canMoveTask(item.status, title.toLowerCase())) {
        dispatch(moveTask({ id: item.id, status: title.toLowerCase() }));
      }
    },
  });

  const canMoveTask = (currentStatus, targetStatus) => {
    if (currentStatus === 'pending' && (targetStatus === 'inprogress' || targetStatus === 'completed')) {
      return true;
    }
    if (currentStatus === 'inprogress' && targetStatus === 'completed') {
      return true;
    }
    return false;
  };

  return (
    <div className="column w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg p-4 shadow-md" ref={drop}>
      <div className="heading border-b border-gray-400 pb-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <ul className="divide-y divide-gray-200 space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default Column;
