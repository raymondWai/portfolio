import React, { ChangeEvent, useRef, MouseEvent } from 'react';
import {
    AppBar,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    toolbarClasses,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import { TFunction } from 'react-i18next';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Locale from '../constants/locale';
import ThemeEnum from '../constants/theme';
import RadioInput from './RadioInput';
import StyledSwitch from './StyledSwitch';
import CircleBox from './CircleBox';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const StyledAppbar = styled(AppBar)(({ theme }) => {
    return {
        minHeight: theme.dimension.header,
        height: theme.dimension.header,
    };
});
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    [`&.${toolbarClasses.root}`]: {
        minHeight: `${theme.dimension.header} !important`,
        height: theme.dimension.header,
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0 !important',
    },
}));
const WhiteThemeIcon = styled(WbSunnyIcon)(({ theme }) => ({
    color: theme.palette.secondary.main,
}));

interface HeaderProps {
    locale: Locale;
    theme: ThemeEnum;
    sidebarCollapse: boolean;
    t: TFunction;
    handleLocaleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCollapseBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const Header = ({
    t,
    locale,
    theme,
    sidebarCollapse,
    handleLocaleChange,
    handleThemeChange,
    handleCollapseBtnClick,
}: HeaderProps) => {
    const themeSwitchRef = useRef<HTMLInputElement>(null);
    return (
        <StyledAppbar position='static'>
            <StyledToolbar>
                <IconButton
                    onClick={handleCollapseBtnClick}
                    sx={{
                        paddingLeft: 0,
                    }}
                >
                    <ExpandLessIcon
                        sx={{
                            transformOrigin: 'center',
                            transform: sidebarCollapse
                                ? 'rotate(90deg)'
                                : 'rotate(-90deg)',
                            color: 'text.primary',
                            marginLeft: '1rem',
                        }}
                    />
                </IconButton>
                <Grid
                    direction='row'
                    container
                    item
                    xs={9}
                    justifyContent={'flex-end'}
                >
                    <RadioInput<Locale>
                        onChange={handleLocaleChange}
                        title={t<string>('general:locale')}
                        options={Object.values(Locale).map((option) => ({
                            value: option,
                            translation: t<string>(`general:${option}`),
                        }))}
                        value={locale}
                    />
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Typography>
                            {t<string>(`general:${ThemeEnum.White}`)}
                        </Typography>
                        <StyledSwitch
                            onChange={handleThemeChange}
                            checked={theme === ThemeEnum.Dark}
                            color='secondary'
                            inputRef={themeSwitchRef}
                            checkedIcon={
                                <CircleBox
                                    onClick={(
                                        e: MouseEvent<HTMLDivElement>
                                    ) => {
                                        if (themeSwitchRef.current) {
                                            themeSwitchRef.current.click();
                                        }
                                    }}
                                >
                                    <Brightness3Icon />
                                </CircleBox>
                            }
                            icon={
                                <CircleBox
                                    onClick={(
                                        e: MouseEvent<HTMLDivElement>
                                    ) => {
                                        if (themeSwitchRef.current) {
                                            themeSwitchRef.current.click();
                                        }
                                    }}
                                >
                                    <WhiteThemeIcon />
                                </CircleBox>
                            }
                        />
                        <Typography>
                            {t<string>(`general:${ThemeEnum.Dark}`)}
                        </Typography>
                    </Stack>
                </Grid>
            </StyledToolbar>
        </StyledAppbar>
    );
};
export default Header;
