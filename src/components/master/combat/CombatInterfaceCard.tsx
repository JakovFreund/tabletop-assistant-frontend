import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Card from "../../ui/Card";
import './CombatInterface.scss';
import { setCreatureHP } from "../../../api";
import { useState } from "react";
import { addLogEntry, setSelectedCreatureId } from "../../../redux/gameStateSlice";
import { LogEntry } from "../../../types";

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
    const { creatures, selectedLogEntryId, combatLog, selectedCreatureId } = useSelector(
        (state: RootState) => state.gameState
    );
    const [loading, setLoading] = useState(false);

    const selectedLogEntry = combatLog.find((e) => e.id === selectedLogEntryId);
    const creature = creatures.find((c) => c.creatureId === creatureId);

    // Example castables for now
    const availableActions: LogEntry[] = [
        {
            id: `${creatureId}-melee`,
            text: `${creatureName} performs a melee attack`,
            castableInstance: {
                id: `${creatureId}-melee`,
                damageType: "physical",
                damageAmount: "6",
                statusEffects: [],
                effectSource: 0,
            },
        },
        {
            id: `${creatureId}-fireball`,
            text: `${creatureName} casts Fireball`,
            castableInstance: {
                id: `${creatureId}-fireball`,
                damageType: "fire",
                damageAmount: "12",
                statusEffects: ["burning"],
                effectSource: 0,
            },
        },
    ];

    const handleActionClick = (e: React.MouseEvent, action: LogEntry) => {
        e.stopPropagation(); // prevent selecting/deselecting the creature card
        dispatch(addLogEntry(action));
    };

    const handleClick = async () => {
        if (!creature) return;

        // MODE 1: Log entry selected → apply effect
        if (selectedLogEntry?.castableInstance) {
            const damage = parseInt(selectedLogEntry.castableInstance.damageAmount, 10) || 0;
            const currentHP = getCreatureHP(creature.turnResources);

            try {
                setLoading(true);
                await setCreatureHP(creatureId, currentHP - damage);
                console.log(`${creatureName} takes ${damage} ${selectedLogEntry.castableInstance.damageType} damage!`);
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
            <div>ID: {creatureId}</div>
            {loading && <div>Updating...</div>}

            {selectedCreatureId === creatureId && (
                <div className="creature-actions">
                    {availableActions.map((a) => (
                        <button
                            key={a.id}
                            className="action-button"
                            onClick={(e) => handleActionClick(e, a)}
                        >
                            {a.text}
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default CombatInterfaceCard;