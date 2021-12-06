import { makeAutoObservable } from 'mobx';
import { baseURL } from 'src/constants/environment';
import type {
    ForcastOption,
    LocationLabelType,
    WeatherForecastType,
} from './types';

export default class DataStore {
    weatherForcast: WeatherForecastType | null;
    locationList: Array<LocationLabelType>;
    mapClient: google.maps.places.PlacesService | null;
    loadingLocation: boolean;
    loadingWeather: boolean;

    constructor() {
        makeAutoObservable(this);
        this.weatherForcast = null;
        this.locationList = [];
        this.mapClient = null;
        this.loadingLocation = false;
        this.loadingWeather = false;
        if (window.google) {
            const mapDiv = document.createElement('div');
            this.mapClient = new window.google.maps.places.PlacesService(
                mapDiv
            );
        }
    }

    async getForcast(option: ForcastOption) {
        const url = new URL(`${baseURL}/onecall`);
        const params = new URLSearchParams();
        Object.keys(option).forEach((key) => {
            const value = option[key as keyof ForcastOption];
            if (value) {
                params.append(key, value);
            }
        });
        url.search = params.toString();
        this.loadingWeather = true;
        fetch(url.toString())
            .then((resp) => resp.json())
            .then((resp) => {
                this.weatherForcast = resp;
                this.loadingWeather = false;
            })
            .catch((err) => {
                this.loadingWeather = false;
            });
    }

    setMapClient() {
        const mapDiv = document.createElement('div');
        if (window.google) {
            this.mapClient = new window.google.maps.places.PlacesService(
                mapDiv
            );
        }
    }

    async searchLocations(query: string) {
        return await new Promise((resolve, reject) => {
            if (this.mapClient) {
                this.loadingLocation = true;
                this.mapClient.findPlaceFromQuery(
                    {
                        fields: ['formatted_address', 'geometry'],
                        query,
                    },
                    (resp, status) => {
                        this.loadingLocation = false;
                        if (
                            status === google.maps.places.PlacesServiceStatus.OK
                        ) {
                            resolve(resp);
                            if (resp) {
                                console.log('resp', resp);
                                this.locationList = resp.map((location) => ({
                                    label: location.formatted_address,
                                    coord: location.geometry?.location?.toJSON(),
                                }));
                            }
                        } else {
                            reject(status);
                        }
                    }
                );
            } else {
                reject('apiNotLoaded');
            }
        });
    }
}
