import React from 'react';
import { Button } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const AIButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  border: '1px solid #ff6f61',
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
    color: '#ff6f61',
  },
}));

const AIButton = ({ handleOpen }) => (
  <AIButtonStyled variant="outlined" onClick={handleOpen}>
    <SmartToyIcon />
    Créer avec l'IA
  </AIButtonStyled>
);

export default AIButton;
