import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export default styled(Box)(({ theme }) => ({
    width: '2rem',
    height: '2rem',
    borderRadius: '2rem',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
}));
