import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UIStore from './store/ui';
import { DataContext, UIContext } from './store';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import DataStore from './store/data';

ReactDOM.render(
    <React.StrictMode>
        <DataContext.Provider value={new DataStore()}>
            <UIContext.Provider value={new UIStore()}>
                <Suspense fallback='loading'>
                    <I18nextProvider i18n={i18n}>
                        <App />
                    </I18nextProvider>
                </Suspense>
            </UIContext.Provider>
        </DataContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
