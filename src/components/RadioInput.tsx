import React, { ChangeEvent, useMemo } from 'react';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    typographyClasses,
} from '@mui/material';
import { styled } from '@mui/system';

const RowFormControl = styled(FormControl)(({ theme }) => ({
    flexDirection: 'row',
    marginHorizontal: '1rem',
}));
const VCenterLabel = styled(Typography)(({ theme }) => ({
    [`&.${typographyClasses.root}`]: {
        alignSelf: 'center',
        marginRight: '1rem !important',
        color: theme.palette.text.primary,
    },
}));

interface RadioInputProps<OptionType> {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    title: string;
    options: Array<{
        value: OptionType;
        translation: string;
    }>;
    value: OptionType;
}

export default function RadioInput<OptionType>({
    onChange,
    options,
    value,
    title,
}: RadioInputProps<OptionType>) {
    const memoOptions = useMemo(
        () =>
            options.map((option, index) => (
                <FormControlLabel
                    value={option.value}
                    control={
                        <Radio
                            color='secondary'
                            checked={value === option.value}
                        />
                    }
                    label={option.translation}
                    key={`${value}-${index}`}
                />
            )),
        [value, options]
    );
    return (
        <RowFormControl>
            <VCenterLabel>{title}</VCenterLabel>
            <RadioGroup row aria-label={title} onChange={onChange}>
                {memoOptions}
            </RadioGroup>
        </RowFormControl>
    );
}
