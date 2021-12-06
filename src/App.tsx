import React, { useContext, useEffect, useMemo } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { ThemeProvider as SystemThemeProvider } from '@mui/material';
import UIStore from './store/ui';
import { observer } from 'mobx-react';
import Theme from './constants/theme';
import { DataContext, UIContext } from './store';
import DarkTheme from './themes/dark';
import WhiteTheme from './themes/white';
import { renderRoutes } from 'react-router-config';
import routeConfig from './constants/route';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleMapApiKey } from './constants/environment';
import DataStore from './store/data';

function App() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: ['places'],
        preventGoogleFontsLoading: true,
    });
    const uiStore = useContext<UIStore>(UIContext);
    const dataStore = useContext<DataStore>(DataContext);
    const theme = useMemo(
        () =>
            responsiveFontSizes(
                createTheme(
                    uiStore.theme === Theme.Dark ? DarkTheme : WhiteTheme
                )
            ),
        [uiStore.theme]
    );
    useEffect(() => {
        if (isLoaded) {
            dataStore.setMapClient();
        }
        return () => {
            if (isLoaded) {
                dataStore.setMapClient();
            }
        };
    }, [isLoaded, dataStore]);
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
