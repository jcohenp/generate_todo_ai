import React, { useState } from 'react';
import { Box, Typography, Checkbox, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styled from 'styled-components';

// Styled container for the task list
const TaskInput = styled(TextField)`
  width: 100%;
  font-size: 1.2rem;
  background-color: #333;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  ::placeholder {
    color: #b0b0b0;
  }
`;

const TaskListContainer = styled(Box)`
  background-color: #1c1c1e; /* Dark background */
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6); /* Soft shadow for depth */
  color: #f5f5f5;
`;

const TaskListItem = styled(ListItem)`
  background-color: #2c2c2e;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 0.6rem;
  display: flex;
  align-items: center;
`;

const TaskInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #2c2c2e;
  border-radius: 8px;
  padding: 0.8rem;
`;

const PlaceholderText = styled(Typography)`
  font-size: 1.4rem;
  color: #888;
`;

const ProjectTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
`;

const CreateList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [projectName, setProjectName] = useState(''); // Project name state

  // Function to add a new task when pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask(''); // Clear input after adding task
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <TaskListContainer sx={{ padding: '2rem', minHeight: '80vh' }}>
      {/* Project Name Input */}
      <TaskInput
        fullWidth
        variant="outlined"
        placeholder="Give me a project name..."
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)} // Update project name
        inputProps={{ style: { color: 'white', fontSize: '1.5rem' } }}
        sx={{ marginBottom: '1.5rem' }}
      />

      {/* Add Task Input */}
      <TaskInputWrapper>
        <TaskInput
          fullWidth
          variant="outlined"
          placeholder="Press 'Enter' to add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          inputProps={{ style: { color: 'white' } }}
        />
        <IconButton
          sx={{ backgroundColor: '#ff6f61', color: '#fff', '&:hover': { backgroundColor: '#e65e52' } }}
          onClick={() => {
            if (newTask.trim()) {
              setTasks([...tasks, { task: newTask, completed: false }]);
              setNewTask('');
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </TaskInputWrapper>

      {/* Task List */}
      <List>
        {tasks.length === 0 ? (
          <PlaceholderText>
            Start adding tasks to your project...
          </PlaceholderText>
        ) : (
          tasks.map((task, index) => (
            <TaskListItem key={index}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                color="primary"
              />
              <ListItemText
                primary={task.task}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: 'white',
                }}
              />
            </TaskListItem>
          ))
        )}
      </List>
    </TaskListContainer>
  );
};

export default CreateList;
