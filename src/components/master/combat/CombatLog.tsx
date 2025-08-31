import { useDispatch, useSelector } from "react-redux";
import { addLogEntry, setSelectedLogEntryId } from "../../../redux/gameStateSlice"
import { LogEntry } from "../../../types";
import { RootState } from "../../../redux/store";


const CombatLog = () => {
    const combatLog = useSelector((state: RootState) => state.gameState.combatLog);
    const selectedLogEntryId = useSelector((state: RootState) => state.gameState.selectedLogEntryId);
    const dispatch = useDispatch();

    // temporary mock
    const actions: LogEntry[] = [
        {
            id: "1",
            text: "Fireball",
            castableInstance: {
                id: "1",
                damageType: "fire",
                damageAmount: "12",
                statusEffects: ["burning"],
                effectSource: 0,
            },
        },
        {
            id: "2",
            text: "Healing Word",
            castableInstance: {
                id: "2",
                damageType: "healing",
                damageAmount: "8",
                statusEffects: [],
                effectSource: 0,
            },
        },
        {
            id: "3",
            text: "Sword Slash",
            castableInstance: {
                id: "3",
                damageType: "physical",
                damageAmount: "10",
                statusEffects: ["bleeding"],
                effectSource: 0,
            },
        },
    ];


    const handleAddLogEntry = (action: LogEntry) => {
        const entry: LogEntry = {
            id: action.id,
            text: action.text,
            castableInstance: action.castableInstance
        };

        // Dispatch the Redux action
        dispatch(addLogEntry(entry));

        // Optionally update local state
        // setLog((prev) => [...prev, entry]);
    };


    const handleLogClick = (entry: LogEntry) => {
        if (entry.castableInstance === undefined) {
            console.log("isundefined :)")
        } else {
            dispatch(setSelectedLogEntryId(entry.id));

        }
    };

    return (
        <div className="combat-log-container">
            {/* Action buttons */}
            <div className="actions">
                {actions.map((a) => (
                    <button
                        key={a.id}
                        onClick={() => handleAddLogEntry(a)}
                        className="action-button"
                    >
                        {a.text}
                    </button>
                ))}
            </div>


            {/* Combat log */}
            <div className="log-box">
                {combatLog.map((entry) => (
                    <div
                        key={entry.id}
                        className={`log-entry ${selectedLogEntryId === entry.id ? "selected" : ""}`}
                        onClick={() => handleLogClick(entry)}
                    >
                        {entry.text}
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
