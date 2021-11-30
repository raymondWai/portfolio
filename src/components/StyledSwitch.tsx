import { Switch, switchClasses } from '@mui/material';
import { styled } from '@mui/styles';

export default styled(Switch)(({ theme }) => ({
    [`&.${switchClasses.root}`]: {
        width: '4rem !important',
    },
    [`& .${switchClasses.switchBase}`]: {
        height: '3rem',
        paddingTop: '0 !important',
    },
}));
