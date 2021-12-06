import {
    List,
    ListItemButton,
    listItemButtonClasses,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Location } from 'history';
import React, { MouseEvent, useMemo } from 'react';
import { TFunction } from 'react-i18next';
import { RouteKeyMap, Routes } from 'src/constants/route';
import { styled, useTheme } from '@mui/styles';

const StyledItemButton = styled(ListItemButton)(({ theme }) => ({
    [`&.${listItemButtonClasses.selected}`]: {
        backgroundColor: `${theme.palette.primary.light} !important`,
        color: `${theme.palette.secondary.contrastText} !important`,
        alignContent: 'center',
        display: 'flex',
    },
}));
interface RouteItemProps {
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
    selected: boolean;
    name: string;
    collapse: boolean;
    icon: (props: { selected: boolean }) => JSX.Element;
}
const RouteItem = ({
    selected,
    name,
    collapse,
    icon,
    onClick,
}: RouteItemProps) => {
    return (
        <StyledItemButton selected={selected} onClick={onClick}>
            <ListItemIcon
                sx={{
                    width: 'fit-content',
                    minWidth: 0,
                }}
            >
                {icon({ selected })}
            </ListItemIcon>
            {!collapse && (
                <ListItemText
                    primary={name}
                    sx={{
                        margin: '0 0.5rem',
                        marginTop: '0.2rem',
                        color: 'text.primary'
                    }}
                />
            )}
        </StyledItemButton>
    );
};
interface SidebarProps {
    location: Location;
    history: any;
    collapse: boolean;
    t: TFunction<('general' | 'route')[], undefined>;
}
const Sidebar = ({ location, history, collapse, t }: SidebarProps) => {
    const theme = useTheme();
    const routes = useMemo(
        () =>
            Object.values(Routes).map((route, index) => {
                return (
                    <RouteItem
                        selected={location.pathname === RouteKeyMap[route].path}
                        name={t<string>(`routes:${route}`)}
                        onClick={(e) => {
                            history.push(RouteKeyMap[route].path);
                        }}
                        key={`${route}-${index}`}
                        icon={RouteKeyMap[route].icon}
                        collapse={collapse}
                    />
                );
            }),
        [t, location, history, collapse]
    );
    return (
        <List
            component='nav'
            aria-label='routes'
            disablePadding
            dense
            sx={{
                bgcolor: '#404040',
                flexGrow: 1,
                backgroundColor: 'background.default',
                borderRight: `0.1rem solid ${theme.palette.primary.main}`
            }}
        >
            {routes}
        </List>
    );
};
export default Sidebar;
