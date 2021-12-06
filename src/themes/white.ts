import { CustomTheme } from './type';

const WhiteTheme: CustomTheme = {
    palette: {
        primary: {
            main: '#3fb550',
            light: '#8ff1a4',
            dark: '#3ab14c',
            contrastText: '#161616',
        },
        secondary: {
            main: '#0024fd',
            light: '#7a82f3',
            dark: '#0a22b3',
            contrastText: '#161616',
        },
        text: {
            primary: '#161616',
            secondary: '#161616',
        },
        background: {
            default: '#e0dede',
        },
    },
    dimension: {
        header: '3rem',
        sidebar: '10rem',
    },
};
export default WhiteTheme;
