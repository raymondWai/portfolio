import React, { useContext, useMemo } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { ThemeProvider as SystemThemeProvider } from '@mui/material';
import UIStore from './store/ui';
import { observer } from 'mobx-react';
import Theme from './constants/theme';
import { UIContext } from './store';
import DarkTheme from './themes/dark';
import WhiteTheme from './themes/white';
import { renderRoutes } from 'react-router-config';
import routeConfig from './constants/route';

function App() {
    const uiStore = useContext<UIStore>(UIContext);
    const theme = useMemo(
        () =>
            responsiveFontSizes(
                createTheme(
                    uiStore.getTheme === Theme.Dark ? DarkTheme : WhiteTheme
                )
            ),
        [uiStore.getTheme]
    );
    return (
        <SystemThemeProvider theme={theme}>
            {/* theme for sx props */}
            <ThemeProvider theme={theme}>
                {/* theme for styled component */}
                <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
            </ThemeProvider>
        </SystemThemeProvider>
    );
}

export default observer(App);
