import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AIButton from '../components/AIButton';
import NewListButton from '../components/NewListButton';
import AIModal from '../components/AIModal';
import TaskBlock from '../components/TaskBlock';
import axios from 'axios';

const Workspace = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleGenerateWithAI = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/generate_todo', { objectives: userInput });
      setTodoList(response.data.todo_list || []);
      setOpen(false);
    } catch (error) {
      console.error('Error generating tasks:', error);
    }
  };

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#1e1e1e', minHeight: '80vh', borderRadius: '8px' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Workspace
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <AIButton handleOpen={handleOpen} />
        <NewListButton />
      </Box>

      {/* AI Modal */}
      <AIModal
        open={open}
        handleClose={handleClose}
        handleGenerateWithAI={handleGenerateWithAI}
        userInput={userInput}
        setUserInput={setUserInput}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleCloseMenu={handleCloseMenu}
        openMenu={openMenu}
      />

      {/* Render AI-generated tasks */}
      {todoList.length > 0 ? (
        <Box sx={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#222', borderRadius: '8px' }}>
          {todoList.map((task, index) => (
            <TaskBlock key={index} task={task} index={index} />
          ))}
        </Box>
      ) : (
        <Typography color="secondary">No tasks generated yet.</Typography>
      )}
    </Box>
  );
};

export default Workspace;
