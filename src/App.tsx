import React, { useContext, useMemo } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
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
        <ThemeProvider theme={theme}>
            <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
        </ThemeProvider>
    );
}

export default observer(App);
