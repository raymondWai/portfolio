import { observer } from 'mobx-react';
import React, {
    ChangeEvent,
    useCallback,
    useContext,
    MouseEvent,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Locale from '../constants/locale';
import LocalStorageKey from '../constants/localStorageKey';
import ThemeEnum from '../constants/theme';
import { UIContext } from '../store';
import UIStore from '../store/ui';

const HeaderContainer = () => {
    const { t, i18n } = useTranslation(['general']);
    const uiStore = useContext<UIStore>(UIContext);
    const [isSettingShow, setIsSettingShow] = useState(false);

    const handleLocaleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            //change and store the language in mobx store and localStorage
            i18n.changeLanguage(e.target.value);
            localStorage.setItem(LocalStorageKey.Locale, e.target.value);
            uiStore.setLocale(e.target.value as Locale);
        },
        [i18n, uiStore]
    );
    const handleThemeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            //change and store the theme in mobx store and localStorage
            localStorage.setItem(
                LocalStorageKey.Theme,
                e.target.checked ? ThemeEnum.Dark : ThemeEnum.White
            );
            uiStore.setTheme(
                e.target.checked ? ThemeEnum.Dark : ThemeEnum.White
            );
        },
        [uiStore]
    );
    const handleCollapseBtnClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            uiStore.setSidebarCollapse(!uiStore.sidebarCollapse);
        },
        [uiStore]
    );
    const handleSettingPopupShow = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            setIsSettingShow(!isSettingShow);
        },
        [isSettingShow, setIsSettingShow]
    );

    return (
        <Header
            t={t}
            locale={uiStore.locale}
            theme={uiStore.theme}
            sidebarCollapse={uiStore.sidebarCollapse}
            isSettingShow={isSettingShow}
            handleLocaleChange={handleLocaleChange}
            handleThemeChange={handleThemeChange}
            handleCollapseBtnClick={handleCollapseBtnClick}
            handleSettingPopupShow={handleSettingPopupShow}
        />
    );
};
export default observer(HeaderContainer);
