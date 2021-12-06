import { Avatar, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { memo } from 'react';
import { TFunction } from 'react-i18next';
import TempUnit from 'src/constants/tempUnit';

interface ForcastBoxProps {
    feelTemp: string;
    min: number;
    max: number;
    noOfItems: number;
    date: string;
    tempUnit: TempUnit;
    pop: number;
    icon: string;
    description: string;
    t: TFunction;
}
const CenterBox = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    minWidth: 180,
});
const ForcastBox = ({
    feelTemp,
    min,
    max,
    noOfItems,
    date,
    tempUnit,
    pop,
    description,
    icon,
    t,
}: ForcastBoxProps) => {
    return (
        <Grid
            item
            container
            justifyContent='center'
            direction={'column'}
            xs={Math.round(12 / noOfItems)}
            sx={{
                minWidth: 200
            }}
        >
            <CenterBox>
                <Typography sx={{ typography: 'h6' }}>{date}</Typography>
            </CenterBox>
            {icon && (
                <CenterBox>
                    <Avatar
                        src={icon}
                        sx={{
                            width: 96,
                            height: 96,
                        }}
                    />
                </CenterBox>
            )}
            <CenterBox>
                <Typography sx={{ typography: 'body1' }}>
                    {`${t('demo:feel_likes')}: `}
                    {`${feelTemp}${t(`demo:tempUnit_${tempUnit}`)}`}
                </Typography>
            </CenterBox>
            {description && (
                <CenterBox>
                    <Typography sx={{ typography: 'body1' }}>
                        {`${t('demo:description')}: `}
                        {description}
                    </Typography>
                </CenterBox>
            )}
            <CenterBox>
                <Typography sx={{ typography: 'body1' }}>
                    {`${t('demo:precipitation')}: `}
                    {Intl.NumberFormat('en-US', { style: 'percent' }).format(
                        pop
                    )}
                </Typography>
            </CenterBox>
            <CenterBox>
                <Typography sx={{ typography: 'body1' }}>
                    {`${t('demo:max_temp')}: `}
                    {`${max}${t(`demo:tempUnit_${tempUnit}`)}`}
                </Typography>
            </CenterBox>
            <CenterBox>
                <Typography sx={{ typography: 'body1' }}>
                    {`${t('demo:min_temp')}: `}
                    {`${min}${t(`demo:tempUnit_${tempUnit}`)}`}
                </Typography>
            </CenterBox>
        </Grid>
    );
};
export default memo(ForcastBox);
