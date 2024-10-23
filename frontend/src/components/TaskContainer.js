import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import RoundedCheckbox from './RoundedCheckbox';
import TaskMenu from './TaskMenu';
import { TaskContainer as TaskWrapper, MainTaskContainer } from './StyledComponents';

const TaskContainer = ({ task, index, expandedTasks, toggleTaskExpand, setTasks, tasks }) => {
  const handleTaskEdit = (e, index, isSubtask, subIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updatedTasks = [...tasks];

      if (isSubtask) {
        updatedTasks[index].subtasks[subIndex] = e.target.textContent;
      } else {
        updatedTasks[index].title = e.target.textContent;
      }

      setTasks(updatedTasks);
      e.target.blur();
    }
  };

  return (
    <React.Fragment>
      <MainTaskContainer>
        {task.subtasks.length > 0 && (
          expandedTasks.includes(index) ? (
            <IconButton onClick={() => toggleTaskExpand(index)} sx={{ color: '#fff' }}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton onClick={() => toggleTaskExpand(index)} sx={{ color: '#fff' }}>
              <ExpandMore />
            </IconButton>
          )
        )}
        <Typography
          contentEditable
          suppressContentEditableWarning
          sx={{ color: '#fff', outline: 'none', flexGrow: 1 }}
          onKeyDown={(e) => handleTaskEdit(e, index, false)}
        >
          {task.title}
        </Typography>
      </MainTaskContainer>

      {expandedTasks.includes(index) &&
        task.subtasks.map((subtask, subIndex) => (
          <TaskWrapper key={subIndex} isSubtask>
            <RoundedCheckbox />
            <Typography
              contentEditable
              suppressContentEditableWarning
              sx={{ color: '#fff', outline: 'none', flexGrow: 1 }}
              onKeyDown={(e) => handleTaskEdit(e, index, true, subIndex)}
            >
              {subtask}
            </Typography>
            <TaskMenu subIndex={subIndex} index={index} tasks={tasks} setTasks={setTasks} />
          </TaskWrapper>
        ))}
    </React.Fragment>
  );
};

export default TaskContainer;
