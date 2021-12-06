import Locale from 'src/constants/locale';

export const getWeatherLangMapping = (lang: Locale) => {
    switch (lang) {
        case Locale.EN:
            return 'en';
        case Locale.ZH:
            return 'zh_tw';
    }
};
