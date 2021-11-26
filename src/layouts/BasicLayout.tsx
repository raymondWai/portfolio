import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
import React, { FunctionComponent, useContext } from 'react';
import Sidebar from '../containers/Sidebar';
import Header from '../containers/Header';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import UIStore from 'src/store/ui';
import { UIContext } from 'src/store';
import { observer } from 'mobx-react';

const Background = styled(Grid)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: 'max(50rem, 100vh)',
    minWidth: '37.5rem',
}));
const BasicLayout: FunctionComponent<RouteConfigComponentProps<{}>> = ({
    route,
}: RouteConfigComponentProps<{}>) => {
    return (
        <Background container direction='column'>
            <Header />
            <Grid
                direction='row'
                container
                justifyContent={'flex-start'}
                flexGrow={1}
            >
                <Grid item container xs={'auto'}>
                    <Sidebar />
                </Grid>
                <Grid item>{route && renderRoutes(route.routes)}</Grid>
            </Grid>
        </Background>
    );
};
export default BasicLayout;
