import {
    AutocompleteChangeDetails,
    Button,
    Card,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    Skeleton,
    TextField,
    Typography,
} from '@mui/material';
import React, {
    ChangeEvent,
    memo,
    MouseEvent,
    SyntheticEvent,
    useMemo,
} from 'react';
import { LocationLabelType, WeatherForecastType } from 'src/store/types';
import StyledAutoComplete from './StyledAutoComplete';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { TFunction } from 'react-i18next';
import ForcastBox from './ForcastBox';
import RadioInput from './RadioInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import dayjs from 'dayjs';
import TempUnit from 'src/constants/tempUnit';
import { Option } from 'src/containers/Demo/types';
import { weatherIconBaseURL } from 'src/constants/environment';
interface DemoProps {
    locationList: Array<{
        label?: string;
        coord?: google.maps.LatLngLiteral;
    }>;
    weatherData: WeatherForecastType | null;
    optionExpanded: boolean;
    noOfItems: number;
    tempUnit: TempUnit;
    loadingLocation: boolean;
    loadingWeather: boolean;
    t: TFunction;
    onOptionUpdate: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: keyof Option
    ) => void;
    selectCurrentLocation: (e: MouseEvent<HTMLButtonElement>) => void;
    onOptionExpand: (e: MouseEvent<HTMLButtonElement>) => void;
    onLocationInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onLocationSelect: (
        e: SyntheticEvent,
        value:
            | string
            | LocationLabelType
            | (string | LocationLabelType)[]
            | null,
        reason: string,
        details?: AutocompleteChangeDetails<LocationLabelType> | undefined
    ) => void;
}
const Demo = ({
    locationList,
    weatherData,
    noOfItems,
    optionExpanded,
    tempUnit,
    loadingWeather,
    loadingLocation,
    t,
    onOptionUpdate,
    selectCurrentLocation,
    onOptionExpand,
    onLocationInputChange,
    onLocationSelect,
}: DemoProps) => {
    const WeatherForcasts = useMemo(
        () =>
            weatherData?.daily
                .filter((_, index) => index < noOfItems)
                .map((forcast, index) => {
                    const date = dayjs()
                        .add(index + 1)
                        .format('D MMM YYYY, ddd');
                    const { min, max } = forcast.temp;
                    return (
                        <ForcastBox
                            feelTemp={Intl.NumberFormat('en-US', {
                                minimumSignificantDigits: 2,
                                maximumSignificantDigits: 3,
                            }).format(
                                [
                                    forcast.feels_like.morn,
                                    forcast.feels_like.day,
                                    forcast.feels_like.eve,
                                    forcast.feels_like.night,
                                ].reduce((prev, next) => prev + next, 0) / 4
                            )}
                            min={min}
                            max={max}
                            noOfItems={noOfItems}
                            date={date}
                            pop={forcast.pop}
                            tempUnit={tempUnit}
                            description={
                                forcast.weather.length > 0
                                    ? forcast.weather[0].description
                                    : ''
                            }
                            icon={
                                forcast.weather[0]
                                    ? `${weatherIconBaseURL}${forcast.weather[0].icon}@2x.png`
                                    : ''
                            }
                            t={t}
                        />
                    );
                }),
        [weatherData, noOfItems, tempUnit, t]
    );
    return (
        <Grid
            container
            direction='column'
            sx={{
                padding: '1rem 2rem',
            }}
        >
            <Typography
                variant={'h4'}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'secondary.main',
                }}
            >
                <FilterDramaIcon
                    sx={{ marginRight: '1rem', color: 'text.primary' }}
                />
                {t('demo:greeting')}
                <FlashOnIcon
                    sx={{ marginLeft: '1rem', color: 'text.primary' }}
                />
            </Typography>
            <Card
                elevation={0}
                sx={{
                    backgroundColor: 'background.default',
                }}
            >
                <Grid container direction='column'>
                    <Grid
                        item
                        container
                        direction='row'
                        justifyContent={'center'}
                    >
                        <CardHeader
                            title={t('demo:options')}
                            action={
                                <IconButton onClick={onOptionExpand}>
                                    {optionExpanded ? (
                                        <ExpandLessIcon
                                            sx={{
                                                color: 'text.primary',
                                            }}
                                        />
                                    ) : (
                                        <ExpandMoreIcon
                                            sx={{
                                                color: 'text.primary',
                                            }}
                                        />
                                    )}
                                </IconButton>
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        direction='row'
                        justifyContent={'center'}
                    >
                        <Collapse in={optionExpanded}>
                            <Grid item container direction='column'>
                                <Grid
                                    item
                                    container
                                    direction='row'
                                    justifyContent='center'
                                >
                                    <RadioInput<number>
                                        onChange={(e) =>
                                            onOptionUpdate(e, 'noOfItems')
                                        }
                                        title={t('demo:no_of_day')}
                                        options={new Array(5)
                                            .fill(2)
                                            .map((value, index) => ({
                                                value: value + index,
                                                translation: `${value + index}`,
                                            }))}
                                        value={noOfItems}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction='row'
                                    justifyContent='center'
                                >
                                    <RadioInput<TempUnit>
                                        onChange={(e) =>
                                            onOptionUpdate(e, 'tempUnit')
                                        }
                                        title={t('demo:tempUnit')}
                                        options={Object.values(TempUnit).map(
                                            (value) => ({
                                                value: value,
                                                translation: t(
                                                    `demo:tempUnit_${value}`
                                                ),
                                            })
                                        )}
                                        value={tempUnit}
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Grid>
                </Grid>
            </Card>
            <Grid item container direction='row' justifyContent={'center'}>
                <Grid item container justifyContent={'center'} xs={6}>
                    <StyledAutoComplete<LocationLabelType>
                        disablePortal
                        autoComplete
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={onLocationInputChange}
                                placeholder={t('demo:input_location')}
                            />
                        )}
                        noOptionsText={t('demo:location_not_found')}
                        onChange={onLocationSelect}
                        options={locationList}
                        loading={loadingLocation}
                    />
                </Grid>
                <Button
                    onClick={selectCurrentLocation}
                    sx={{
                        color: 'text.primary',
                    }}
                >
                    {t('demo:select_current_location')}
                </Button>
            </Grid>
            {WeatherForcasts && (
                <Grid
                    item
                    container
                    direction='row'
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                    sx={{
                        marginTop: '1rem',
                        flexGrow: 1,
                    }}
                >
                    {loadingWeather ? (
                        <Skeleton
                            variant='rectangular'
                            height={'30vh'}
                            width={'50vw'}
                        />
                    ) : (
                        WeatherForcasts
                    )}
                </Grid>
            )}
        </Grid>
    );
};
export default memo(Demo);
