type CurrentWeather = {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number; //atm temperature
    clouds: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number; //direction, degrees
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    rain: {
        '1h'?: number;
    };
    snow: {
        '1h'?: number;
    };
};
export type WeatherForecastType = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    minutely: Array<{
        dt: number;
        precipitation: number;
    }>;
    hourly: Array<
        Omit<CurrentWeather, 'sunrise' | 'sunset'> & {
            pop: number;
        }
    >;
    daily: Array<
        Omit<CurrentWeather, 'temp' | 'feels_like' | 'rain' | 'snow'> & {
            moonrise: number;
            moonset: number;
            moon_phase: number;
            temp: {
                morn: number;
                day: number;
                eve: number;
                night: number;
                min: number;
                max: number;
            };
            feels_like: {
                morn: number;
                day: number;
                eve: number;
                night: number;
            };
            pop: number;
            rain?: number;
            snow?: number;
        }
    >;
    alerts: Array<{
        sender_name: string;
        event: string;
        start: number;
        end: number;
        description: string;
        tags: Array<string>;
    }>;
};

export enum ForcastExcludeType {
    Current = 'current',
    Minutely = 'minutely',
    Hourly = 'hourly',
    Daily = 'daily',
    Alerts = 'alerts',
}
export enum ForcastUnitType {
    Standard = 'standard',
    Metric = 'metric',
    Imperial = 'imperial',

}
export type ForcastOption = {
    lat: string;
    lon: string;
    appid: string; //apiKey
    exclude?: ForcastExcludeType; //if specified, the field will be excluded. format: key1,key2
    units?: ForcastUnitType;
    lang?: string;
};

export type AutoCompleteLabelType = {
    label?: string
}
export type LocationLabelType = AutoCompleteLabelType & {
    coord?: google.maps.LatLngLiteral
}