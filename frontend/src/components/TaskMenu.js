import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const TaskMenu = ({ subIndex, index, tasks, setTasks }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addSubtask = (position) => {
    const updatedTasks = [...tasks];
    const newSubtask = 'New Subtask';

    if (position === 'above') {
      updatedTasks[index].subtasks.splice(subIndex, 0, newSubtask);
    } else {
      updatedTasks[index].subtasks.splice(subIndex + 1, 0, newSubtask);
    }

    setTasks(updatedTasks);
    handleMenuClose();
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleMenuClick}>
        <MoreVert sx={{ color: '#fff' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => addSubtask('above')}>Add subtask above</MenuItem>
        <MenuItem onClick={() => addSubtask('below')}>Add subtask below</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default TaskMenu;
