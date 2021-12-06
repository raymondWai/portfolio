import { observer } from 'mobx-react';
import React, {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useRef,
    MouseEvent,
    useState,
    SyntheticEvent,
} from 'react';
import Demo from 'src/components/Demo';
import { openWeatherApiKey } from 'src/constants/environment';
import { UIContext, DataContext } from 'src/store';
import UIStore from 'src/store/ui';
import DataStore from 'src/store/data';
import { getGeoLocation } from 'src/utils/getGeoLocation';
import { getWeatherLangMapping } from 'src/utils/getWeatherLangMapping';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { useTranslation } from 'react-i18next';
import TempUnit, { tempUnitMap } from 'src/constants/tempUnit';
import { Option } from './types';
import { LocationLabelType } from 'src/store/types';
import { AutocompleteChangeDetails } from '@mui/material';

interface DemoProps {}
const DemoContainer = (props: DemoProps) => {
    const { t } = useTranslation(['demo']);
    const dataStore = useContext<DataStore>(DataContext);
    const uiStore = useContext<UIStore>(UIContext);
    const searchDebounceObs = useRef<Subject<string> | null>(null);
    const searchDebounceSub = useRef<Subscription | null>(null);
    const [options, setOptions] = useState<Option>({
        noOfItems: 5,
        tempUnit: TempUnit.C,
        optionExpanded: false,
    });
    const [coord, setCoord] = useState<{
        lat: number | null;
        lon: number | null;
    }>({
        lat: null,
        lon: null,
    });

    const onLocationInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            //emit value to debounce ovserver
            if (searchDebounceObs.current) {
                searchDebounceObs.current.next(e.target.value);
            }
        },
        [searchDebounceObs]
    );
    const selectCurrentLocation = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            getGeoLocation().then(({ lat, lon }) => {
                setCoord({
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                });
                //get weather forcast
                dataStore.getForcast({
                    lat,
                    lon,
                    appid: openWeatherApiKey,
                    lang: getWeatherLangMapping(uiStore.locale),
                    units: tempUnitMap[options.tempUnit],
                });
            });
        },
        [dataStore, uiStore, options, setCoord]
    );
    const onOptionExpand = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            setOptions({
                ...options,
                optionExpanded: !options.optionExpanded,
            });
        },
        [setOptions, options]
    );
    const onOptionUpdate = useCallback(
        (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            type: keyof Option
        ) => {
            switch (type) {
                case 'noOfItems':
                    setOptions({
                        ...options,
                        noOfItems: parseInt(e.target.value),
                    });
                    break;
                case 'tempUnit':
                    setOptions({
                        ...options,
                        tempUnit: e.target.value as TempUnit,
                    });
                    break;
            }
        },
        [options, setOptions]
    );
    const onLocationSelect = useCallback(
        (
            e: SyntheticEvent,
            value:
                | string
                | LocationLabelType
                | (string | LocationLabelType)[]
                | null,
            reason: string,
            details?: AutocompleteChangeDetails<LocationLabelType> | undefined
        ) => {
            if (details?.option && details?.option.coord) {
                const { lat, lng } = details?.option.coord;
                setCoord({
                    lat,
                    lon: lng,
                });
            }
        },
        [setCoord]
    );

    useEffect(() => {
        //set debounce input subscription
        searchDebounceObs.current = new Subject<string>();
        searchDebounceSub.current = searchDebounceObs.current
            ?.pipe(debounceTime(500))
            .subscribe((query) => {
                dataStore.searchLocations(query);
            });
        return () => {
            //unsubscribe the observer when clean up
            searchDebounceSub.current?.unsubscribe();
        };
    }, [searchDebounceObs, searchDebounceSub, dataStore]);

    useEffect(() => {
        if (coord.lat && coord.lon) {
            //auto refetch the forcast when coord, language, unit changed
            dataStore.getForcast({
                lat: coord.lat.toString(),
                lon: coord.lon.toString(),
                appid: openWeatherApiKey,
                lang: getWeatherLangMapping(uiStore.locale),
                units: tempUnitMap[options.tempUnit],
            });
        }
    }, [uiStore.locale, options, coord, dataStore, dataStore.getForcast]);
    return (
        <Demo
            locationList={dataStore.locationList}
            weatherData={dataStore.weatherForcast}
            optionExpanded={options.optionExpanded}
            noOfItems={options.noOfItems}
            tempUnit={options.tempUnit}
            loadingLocation={dataStore.loadingLocation}
            loadingWeather={dataStore.loadingWeather}
            t={t}
            onLocationInputChange={onLocationInputChange}
            selectCurrentLocation={selectCurrentLocation}
            onOptionUpdate={onOptionUpdate}
            onOptionExpand={onOptionExpand}
            onLocationSelect={onLocationSelect}
        />
    );
};
export default observer(DemoContainer);
