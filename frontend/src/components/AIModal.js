import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, IconButton, Button, InputAdornment } from '@mui/material';
import { Add, Edit, ExpandMore, ExpandLess, ArrowBackIosNew, SmartToy, Send } from '@mui/icons-material';
import { StyledModal, TaskContainer, MainTaskContainer } from './StyledComponents';
import RoundedCheckbox from './RoundedCheckbox';

const AIModal = ({ open, handleClose }) => {
  const [userInput, setUserInput] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [topics, setTopics] = useState([]);
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // To track the loading state

  const resetModal = () => {
    setUserInput('');
    setTopics([]);
    setTodoTitle('');
    setExpandedTasks([]);
    handleClose();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGenerateTasks = async () => {
    if (!userInput) return;
  
    try {
      console.log('Starting to send request');
      const response = await fetch('http://127.0.0.1:5000/api/generate_todo_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objectives: userInput }),
      });
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = "";  // Declare buffer here
      let done = false;
  
      console.log('Response received, starting to read chunks');


      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
    
        const chunkText = decoder.decode(value, { stream: true });
        buffer += chunkText;
    
        // Check if buffer contains complete JSON (for simplicity, detecting closing bracket)
        if (buffer.includes('}')) {
            try {
                const parsed = JSON.parse(buffer);
                console.log('Parsed response:', parsed);
                buffer = "";  // Clear buffer after successful parsing
            } catch (error) {
                console.log('Incomplete or invalid JSON, waiting for more chunks.');
            }
        }
    }

     
    } catch (error) {
      console.error('Error generating tasks:', error);
      setTopics([]); // Reset if there’s an error
    }
  };  

  
  const handleToggleExpand = (topicIndex, taskIndex) => {
    const expandedTopicTasks = [...expandedTasks];
    const key = `${topicIndex}-${taskIndex}`;
    if (expandedTasks.includes(key)) {
      setExpandedTasks(expandedTopicTasks.filter((k) => k !== key));
    } else {
      setExpandedTasks([...expandedTopicTasks, key]);
    }
  };

  return (
    <Modal open={open} onClose={resetModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StyledModal>
        {/* Display the title of the todo list at the top of the modal */}
        {todoTitle && (
          <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            {todoTitle}
          </Typography>
        )}

        {/* Generated topics and tasks */}
        {topics.map((topic, topicIndex) => (
          <Box key={topicIndex}>
            <Typography variant="h6" sx={{ color: '#ff6f61', marginBottom: '10px' }}>
              {topic.topicName}
            </Typography>

            {topic.tasks.map((task, taskIndex) => (
              <React.Fragment key={taskIndex}>
                <MainTaskContainer>
                  {task.subtasks.length > 0 && (
                    <IconButton onClick={() => handleToggleExpand(topicIndex, taskIndex)} sx={{ color: '#fff' }}>
                      {expandedTasks.includes(`${topicIndex}-${taskIndex}`) ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                  <Typography sx={{ color: '#fff', flexGrow: 1 }}>
                    {task.taskName} - {task.date} at {task.time}
                  </Typography>
                </MainTaskContainer>

                {expandedTasks.includes(`${topicIndex}-${taskIndex}`) && task.subtasks.map((subtask, subIndex) => (
                  <TaskContainer key={subIndex} isSubtask>
                    <RoundedCheckbox />
                    <Typography sx={{ color: '#fff', flexGrow: 1 }}>
                      {subtask.subtaskName} - {subtask.time}
                    </Typography>
                  </TaskContainer>
                ))}
              </React.Fragment>
            ))}
          </Box>
        ))}

        {/* Input for objectives */}
        <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <SmartToy sx={{ color: '#fff', marginRight: '10px' }} />
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Que voulez-vous faire ensuite?"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleGenerateTasks}>
                    <Send sx={{ color: '#fff' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        </Box>

        {/* Buttons - Display only if tasks are generated */}
        {topics.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '10px' }}>
            <Button startIcon={<Add />} sx={buttonStyle}>Create project</Button>
            <Button startIcon={<Edit />} sx={buttonStyle}>Continue writing</Button>
            <Button startIcon={<ArrowBackIosNew />} sx={buttonStyle}>Make longer</Button>
          </Box>
        )}
      </StyledModal>
    </Modal>
  );
};

// Custom button styles to match the design
const buttonStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
  justifyContent: 'flex-start',
  textTransform: 'none',
  width: '100%',
};

export default AIModal;
