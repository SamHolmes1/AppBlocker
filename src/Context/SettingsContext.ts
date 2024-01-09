import { createContext } from "react";

interface SettingsContextInterface {
    difficulty: number;
    quiz_selected: boolean;
    math_selected: boolean;
    maze_selected: boolean;
}

const SettingsObject = {
    difficulty: 1,
    quiz_selected: true,
    math_selected: true,
    maze_selected: true
}

export const SettingsContext = createContext<SettingsContextInterface>(SettingsObject)