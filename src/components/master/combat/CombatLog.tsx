import { useDispatch, useSelector } from "react-redux";
import { setSelectedLogEntryId } from "../../../redux/uiSlice"
import { LogEntry } from "../../../types";
import { RootState } from "../../../redux/store";


const CombatLog = () => {
    const gameLog = useSelector((state: RootState) => state.gameLog.entries);
    const selectedLogEntryId = useSelector((state: RootState) => state.ui.selectedLogEntryId);
    const dispatch = useDispatch();

    const handleLogClick = (entry: LogEntry) => {
        if (entry.castableInstance === undefined) {
            console.log("isundefined :)")
        } else {
            dispatch(setSelectedLogEntryId(entry.logEntryId));
        }
    };

    return (
        <div className="combat-log-container">
            {/* Combat log */}
            <div className="log-box">
                {gameLog.map((entry) => (
                    <div
                        key={entry.logEntryId}
                        className={`log-entry ${selectedLogEntryId === entry.logEntryId ? "selected" : ""}`}
                        onClick={() => handleLogClick(entry)}
                    >
                        {entry.timestamp + " " + entry.logEntryType} {entry.logEntryType === "CASTABLE_PINGED" ? entry.castableInstance.casterName + " " + entry.castableInstance.castable.name : ""}
                    </div>
                ))}
            </div>

            {selectedLogEntryId && (
                <button
                    className="clear-log-selection"
                    onClick={() => dispatch(setSelectedLogEntryId(null))}
                >
                    Clear Selection
                </button>
            )}
        </div>
    )
}

export default CombatLog
