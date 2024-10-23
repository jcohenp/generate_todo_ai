import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Ensure focus stays on the input
    }
  }, []); // This runs once when the component mounts

  const CustomTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
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
  }));

  return (
    <CustomTextField
      fullWidth
      multiline
      rows={2}
      variant="outlined"
      placeholder="Enter your objective, task, or next big project..."
      value={value}
      onChange={onChange}
      inputRef={inputRef} // Attach the ref here
    />
  );
};

export default StyledTextField;
