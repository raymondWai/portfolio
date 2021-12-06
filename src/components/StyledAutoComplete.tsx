import React from 'react';
import {
    Autocomplete,
    autocompleteClasses,
    AutocompleteProps,
    Popper,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/styles';

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}

const StyledPoper = styled(Popper)(({ theme }) => ({
    [`& .${autocompleteClasses.listbox}`]: {
        background: theme.palette.background.default,
        border: `0.1rem solid ${theme.palette.primary.light}`,
    },
    [`& .${autocompleteClasses.noOptions}, .${autocompleteClasses.loading}`]: {
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        border: `0.1rem solid ${theme.palette.primary.light}`,
    },
}));
const AutoCompletePopper = (props: PopperComponentProps) => (
    <StyledPoper {...props} />
);

export default function StyledAutoComplete<T>(
    props: AutocompleteProps<
        T,
        boolean | undefined,
        boolean | undefined,
        boolean | undefined,
        'div'
    >
) {
    const theme = useTheme();
    return (
        <Autocomplete
            {...props}
            PopperComponent={AutoCompletePopper}
            sx={{
                [`&.${autocompleteClasses.root}`]: {
                    width: '50vw',
                },
                [`& .${autocompleteClasses.input}`]: {
                    color: theme.palette.text.primary,
                },
                [`& .${autocompleteClasses.inputRoot}, .${autocompleteClasses.inputRoot}:hover`]:
                    {
                        border: `0.1rem solid ${theme.palette.primary.main}`,
                    },
            }}
        />
    );
}
