import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Reusable styled components for TaskContainer and MainTaskContainer
export const TaskContainer = styled(Box)(({ theme, isSubtask }) => ({
  backgroundColor: '#2b2b2b',
  color: '#fff',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px',
  marginLeft: isSubtask ? '20px' : '0px',
  borderLeft: isSubtask ? '2px solid #444' : 'none',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#444',
  },
}));

export const MainTaskContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#2b2b2b',
  color: '#fff',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  borderLeft: '2px solid #444',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#444',
  },
}));

// Add the StyledModal component
export const StyledModal = styled(Box)(({ theme }) => ({
  width: '600px',
  backgroundColor: '#2b2b2b',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxHeight: '90vh',
  overflowY: 'auto',
}));
