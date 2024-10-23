import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const TaskBlockStyled = styled(Box)(({ theme }) => ({
  backgroundColor: '#2b2b2b',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
}));

const TaskBlockTitle = styled(Typography)(({ theme }) => ({
  color: '#ff6f61',
  fontSize: '1.4rem',
  marginBottom: '10px',
}));

const TaskBlockContent = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '1rem',
  marginBottom: '5px',
}));

const TaskBlock = ({ task, index }) => (
  <TaskBlockStyled>
    <TaskBlockTitle>{`Task ${index + 1}`}</TaskBlockTitle>
    <TaskBlockContent>{task}</TaskBlockContent>
  </TaskBlockStyled>
);

export default TaskBlock;
