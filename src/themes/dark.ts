import { blue } from '@mui/material/colors';
import { CustomTheme } from './type';

const DarkTheme: CustomTheme = {
    palette: {
        primary: {
            main: blue[400],
            light: blue[300],
            dark: blue[800],
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#fdf100',
            light: '#f9f395',
            dark: '#ded502',
            contrastText: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#161616',
        },
        background: {
            default: '#161616',
        },
    },
    dimension: {
        header: '3rem',
        sidebar: '10rem',
    },
};
export default DarkTheme;
