import React from 'react';
import { Button } from '@mui/material';
import { List as ListIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const NewListButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  border: '1px solid #888',
  color: '#fff',
  backgroundColor: 'transparent',
  padding: '0.6rem 1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '&:hover': {
    backgroundColor: '#333',
  },
  '& .MuiSvgIcon-root': {
    color: '#888',
  },
}));

const NewListButton = () => (
  <NewListButtonStyled variant="outlined" component={Link} to="/create-list">
    <ListIcon />
    Nouvelle liste
  </NewListButtonStyled>
);

export default NewListButton;
