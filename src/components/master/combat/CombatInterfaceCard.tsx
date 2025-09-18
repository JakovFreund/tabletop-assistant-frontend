import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Card from "../../ui/Card";
import './CombatInterface.scss';
import { pingCastable } from "../../../api";
import { useState } from "react";
import { setSelectedCreatureId } from "../../../redux/uiSlice";

interface CombatInterfaceCardProps {
    creatureId: string;
    creatureName: string;
}

// Helper function to extract HP from turnResources
const getCreatureHP = (turnResources: { type: string; amount: number }[]): number => {
    const hpResource = turnResources.find((resource) => resource.type === 'HP');
    return hpResource ? hpResource.amount : 0;
};

const CombatInterfaceCard = ({ creatureId, creatureName }: CombatInterfaceCardProps) => {
    const dispatch = useDispatch();
    const { creatures } = useSelector(
        (state: RootState) => state.gameState
    );
    const entries = useSelector((state: RootState) => state.gameLog.entries);
    const thisDeviceId = useSelector((state: RootState) => state.thisDevice.deviceId);
    const { selectedLogEntryId, selectedCreatureId } = useSelector((state: RootState) => state.ui);
    
    
    
    const [loading, setLoading] = useState(false);

    const selectedLogEntry = entries.find((logEntry) => logEntry.logEntryId === selectedLogEntryId);
    const creature = creatures.find((c) => c.creatureId === creatureId);

    const availableCastables = [
        "Guiding Bolt",
        "Fireball"
    ];

    const handleActionClick = async (e: React.MouseEvent, castableName: string) => {
    e.stopPropagation(); // prevent selecting/deselecting the creature card
    if (!creature) return;

    try {
        setLoading(true);
        // Call backend to ping castable
        await pingCastable(
            thisDeviceId,
            creature.creatureId, 
            castableName,
            3 //slotLevel
        );

        // Optionally refresh the game log from backend
        // dispatch(fetchGameLog());
    } catch (err) {
        console.error("Error pinging castable:", err);
    } finally {
        setLoading(false);
    }
};


    const handleClick = async () => {
        if (!creature) return;

        // MODE 1: Log entry selected → apply effect
        if (selectedLogEntry?.castableInstance) {
            const damageAmount = parseInt("2", 10) || 0; // damageAmount, decimal base 10
            const currentHP = getCreatureHP(creature.turnResources);

            try {
                setLoading(true);
                // instead make a request of casting the selected castable on the creature
                // await setCreatureHP(creatureId, currentHP - damageAmount);
                console.log(`${creatureName} takes damage!`);
            } catch (err) {
                console.error("Error applying damage:", err);
            } finally {
                setLoading(false);
            }
            return;
        }

        // MODE 2: No log entry selected → select this creature
        dispatch(setSelectedCreatureId(creatureId));
    };

    return (
        <Card
            className={`creature ${selectedCreatureId === creatureId ? "selected" : ""}`}
            onClick={handleClick}
        >
            <div>{creatureName}</div>
            <div>{creatureId}</div>
            {loading && <div>Updating...</div>}

            {selectedCreatureId === creatureId && (
                <div className="creature-actions">
                    {availableCastables.map((castable) => (
                        <button
                            key={castable}
                            className="action-button"
                            onClick={(e) => handleActionClick(e, castable)}
                        >
                            {castable}
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default CombatInterfaceCard;