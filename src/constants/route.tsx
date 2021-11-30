import React from 'react';
import { RouteConfig } from 'react-router-config';
import Demo from 'src/containers/Demo';
import Home from 'src/containers/Home';
import BasicLayout from 'src/layouts/BasicLayout';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';

export enum Routes {
    Home = 'home',
    Demo = 'demo',
}
export const RouteKeyMap = {
    [Routes.Home]: {
        path: '/portfolio/',
        icon: ({ selected }: { selected: boolean }) => (
            <HomeIcon
                sx={{
                    color: selected ? 'text.primary' : 'primary.contrastText',
                    lineHeight: 1.43,
                }}
            />
        ),
    },
    [Routes.Demo]: {
        path: '/portfolio/demo',
        icon: ({ selected }: { selected: boolean }) => (
            <SlideshowIcon
                sx={{
                    color: selected ? 'text.primary' : 'primary.contrastText',
                    lineHeight: 1.43,
                }}
            />
        ),
    },
};
const routeConfig: Array<RouteConfig> = [
    {
        component: BasicLayout,
        routes: [
            {
                path: RouteKeyMap[Routes.Home].path,
                exact: true,
                key: Routes.Home,
                component: Home,
            },
            {
                path: RouteKeyMap[Routes.Demo].path,
                exact: true,
                key: Routes.Demo,
                component: Demo,
            },
        ],
    },
];
export default routeConfig;
