import { Theme } from '@mui/material/styles';
export interface CustomTheme {
    palette: {
        primary: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        secondary: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        background: {
            default: string;
        };
    };
    dimension: {
        header: string | number;
        sidebar: string | number;
    };
}

declare module '@mui/system' {
    interface Theme extends CustomTheme {}
    interface DefaultTheme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}
