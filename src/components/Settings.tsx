import FontDropdown from "./settings-components/FontDropdown"
import PuzzleSelector from "./settings-components/PuzzleSelector"
import SettingsConfirmButton from "./settings-components/SettingsConfirmButton"

const Settings = () => {
return (
    <>
    <div className="settings-div"><h2>settings</h2>
    <PuzzleSelector />
    <FontDropdown />
    <SettingsConfirmButton />
    </div>
    </>
)
}

export default Settings