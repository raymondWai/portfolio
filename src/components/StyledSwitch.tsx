import { Switch, SwitchProps } from '@mui/material';
import { Styles, withStyles } from '@mui/styles';
import { Theme } from '@mui/system';

export default withStyles<Styles<Theme, SwitchProps>>(
    (theme) => ({
        root: {
            width: '4rem !important',
        },
        switchBase: {
            height: '3rem',
            paddingTop: '0 !important',
            // transform: 'translateX(6px)',
        },
    }),
    {
        withTheme: true,
    }
)(Switch);
