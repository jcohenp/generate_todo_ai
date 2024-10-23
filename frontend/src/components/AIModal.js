import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowForward, ExpandMore, ExpandLess, MoreVert } from '@mui/icons-material';
import { StyledModal, TaskContainer, MainTaskContainer } from './StyledComponents';
import axios from 'axios';
import RoundedCheckbox from './RoundedCheckbox';

const AIModal = ({ open, handleClose }) => {
  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState(null);

  // Handle input change without re-rendering the entire modal
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to call API and generate tasks
  const handleGenerateTasks = async () => {
    if (!userInput) return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/generate_todo', { objectives: userInput });
  
      const removeMarkdown = (text) => text.replace(/[#*_`~>+=[\]-]+/g, '').trim();
  
      const todoList = response.data.todo_list.map(task => ({
        ...task,
        title: removeMarkdown(task.title),
        subtasks: task.subtasks
          .filter(subtask => subtask.trim() !== '')
          .map(subtask => removeMarkdown(subtask)),
      }));
  
      setTasks(todoList);
      setUserInput('');
    } catch (error) {
      console.error('Error generating tasks:', error);
      setTasks([]);
    }
  };

  // Toggle task expand/collapse
  const handleToggleExpand = (index) => {
    setExpandedTasks(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  // Handle menu open/close
  const handleMenuClick = (event, taskIndex, subtaskIndex) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskIndex(taskIndex);
    setSelectedSubtaskIndex(subtaskIndex);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskIndex(null);
    setSelectedSubtaskIndex(null);
  };

  const addSubtask = (position) => {
    const updatedTasks = [...tasks];
    const newSubtask = 'New Subtask';

    if (selectedTaskIndex !== null && selectedSubtaskIndex !== null) {
      // Insert new subtask above or below the current one
      if (position === 'above') {
        updatedTasks[selectedTaskIndex].subtasks.splice(selectedSubtaskIndex, 0, newSubtask);
      } else if (position === 'below') {
        updatedTasks[selectedTaskIndex].subtasks.splice(selectedSubtaskIndex + 1, 0, newSubtask);
      }

      setTasks(updatedTasks);
      handleMenuClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StyledModal>
        {/* Input for objectives */}
        <Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Enter your objective, task, or next big project..."
            value={userInput}
            onChange={handleInputChange} // Handle input change locally
            autoFocus
            sx={{
              backgroundColor: '#1e1e1e',
              color: '#fff',
              '& .MuiInputBase-root': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6f61',
                },
              },
            }}
          />
          <IconButton onClick={handleGenerateTasks} sx={{ marginTop: '10px', backgroundColor: '#ff6f61', color: '#fff' }}>
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Generated tasks */}
        {tasks.map((task, index) => (
          <React.Fragment key={index}>
            <MainTaskContainer>
              {task.subtasks.length > 0 && (
                <IconButton onClick={() => handleToggleExpand(index)} sx={{ color: '#fff' }}>
                  {expandedTasks.includes(index) ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
              <Typography
                contentEditable
                suppressContentEditableWarning
                sx={{ color: '#fff', outline: 'none', flexGrow: 1 }}
              >
                {task.title}
              </Typography>
            </MainTaskContainer>

            {expandedTasks.includes(index) && task.subtasks.map((subtask, subIndex) => (
              <TaskContainer key={subIndex} isSubtask>
                <RoundedCheckbox />
                <Typography
                  contentEditable
                  suppressContentEditableWarning
                  sx={{ color: '#fff', outline: 'none', flexGrow: 1 }}
                >
                  {subtask}
                </Typography>

                {/* 3-dots menu */}
                <IconButton onClick={(event) => handleMenuClick(event, index, subIndex)}>
                  <MoreVert sx={{ color: '#fff' }} />
                </IconButton>

                {/* Dropdown menu for subtask actions */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedTaskIndex === index && selectedSubtaskIndex === subIndex}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => addSubtask('above')}>Add subtask above</MenuItem>
                  <MenuItem onClick={() => addSubtask('below')}>Add subtask below</MenuItem>
                </Menu>
              </TaskContainer>
            ))}
          </React.Fragment>
        ))}
      </StyledModal>
    </Modal>
  );
};

export default AIModal;
