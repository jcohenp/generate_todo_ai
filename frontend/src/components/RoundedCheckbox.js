import { Checkbox } from '@mui/material';
import { styled } from '@mui/system';

// Custom Checkbox with rounded design
const RoundedCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#fff',
  '&.MuiCheckbox-root': {
    padding: '6px', // Adjust padding for smaller size
  },
  '&.Mui-checked': {
    color: '#ff6f61', // Change the color when checked
  },
  '& .MuiSvgIcon-root': {
    borderRadius: '6px', // More rounded checkbox
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    border: '2px solid rgba(255, 255, 255, 0.6)',
  },
}));

export default RoundedCheckbox;
