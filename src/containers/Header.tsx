import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useContext, MouseEvent } from 'react';
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

    const handleLocaleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            i18n.changeLanguage(e.target.value);
            localStorage.setItem(LocalStorageKey.Locale, e.target.value);
            uiStore.setLocale(e.target.value as Locale);
        },
        [i18n, uiStore]
    );
    const handleThemeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <Header
            t={t}
            locale={uiStore.locale}
            theme={uiStore.theme}
            sidebarCollapse={uiStore.sidebarCollapse}
            handleLocaleChange={handleLocaleChange}
            handleThemeChange={handleThemeChange}
            handleCollapseBtnClick={handleCollapseBtnClick}
        />
    );
};
export default observer(HeaderContainer);
