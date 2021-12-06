import { createContext } from 'react';
import UIStore from './ui';
import DataStore from './data';

export const UIContext = createContext<UIStore>(new UIStore());
export const DataContext = createContext<DataStore>(new DataStore());
