import { createContext } from "react";
import UIStore from "./ui";

export const UIContext = createContext<UIStore>(new UIStore())