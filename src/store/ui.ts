import { makeAutoObservable } from 'mobx';
import Locale from '../constants/locale';
import LocalStorageKey from '../constants/localStorageKey';
import Theme from '../constants/theme';

export default class UIStore {
    theme: Theme;
    locale: Locale;
    sidebarCollapse: boolean;

    constructor() {
        makeAutoObservable(this);
        const theme = localStorage.getItem(LocalStorageKey.Theme);
        const locale = localStorage.getItem(LocalStorageKey.Locale);
        this.theme = (theme ? theme : Theme.Dark) as Theme;
        this.locale = (locale ? locale : Locale.EN) as Locale;
        this.sidebarCollapse = false;
    }
    get getTheme(): Theme {
        return this.theme;
    }
    get getLocale(): Locale {
        return this.locale;
    }
    get getSidebarCollapse(): boolean {
        return this.sidebarCollapse
    }

    setTheme(theme: Theme): void {
        this.theme = theme;
    }
    setLocale(locale: Locale): void {
        this.locale = locale;
    }
    setSidebarCollapse(sidebarCollapse: boolean): void {
        this.sidebarCollapse = sidebarCollapse
    }
}
