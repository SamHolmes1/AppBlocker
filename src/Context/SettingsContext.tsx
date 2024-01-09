import { createContext, useState } from "react";

const SettingsObject = {
    difficulty: 1,
    quiz_selected: true,
    math_selected: true,
    maze_selected: true
}

const [settingsState, setSettingsState] = useState(SettingsObject)

export const SettingsContext = createContext([settingsState, setSettingsState])