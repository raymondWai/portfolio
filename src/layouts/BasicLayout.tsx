import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from 'react';
import Sidebar from '../containers/Sidebar';
import Header from '../containers/Header';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const Background = styled(Grid)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: 'max(8rem, 100vh)',
    display: 'flex',
}));
const ContentContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));
const SidebarContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: 'min(55rem, 100%)',
        borderBottom: `0.1rem solid ${theme.palette.primary.main}`,
        height: '100%',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: '100vw',
        borderBottom: `0.1rem solid ${theme.palette.primary.main}`,
    },
    [theme.breakpoints.up('lg')]: {
        borderRight: `0.1rem solid ${theme.palette.primary.main}`,
    },
}));
const BasicLayout: FunctionComponent<RouteConfigComponentProps<{}>> = ({
    route,
}: RouteConfigComponentProps<{}>) => {
    return (
        <Background container direction='column'>
            <Header />
            <ContentContainer
                container
                justifyContent={'flex-start'}
                flexGrow={1}
                flexWrap={'wrap'}
            >
                <SidebarContainer item container xs={'auto'}>
                    <Sidebar />
                </SidebarContainer>
                <Grid
                    item
                    flexGrow={1}
                    sx={{
                        display: 'flex',
                    }}
                >
                    {route && renderRoutes(route.routes)}
                </Grid>
            </ContentContainer>
        </Background>
    );
};
export default BasicLayout;
