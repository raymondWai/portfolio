import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { UIContext } from 'src/store';
import UIStore from 'src/store/ui';
import Sidebar from '../components/Sidebar';

const SidebarContainer = () => {
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation(['general', 'routes']);
    const uiStore = useContext<UIStore>(UIContext);
    return (
        <Sidebar
            location={location}
            history={history}
            t={t}
            collapse={uiStore.sidebarCollapse}
        />
    );
};
export default observer(SidebarContainer);
