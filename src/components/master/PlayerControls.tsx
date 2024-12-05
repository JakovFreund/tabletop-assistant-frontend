import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCreatureHP } from '../../api';

const PlayerControls = () => {
    const creatures = useSelector((state: RootState) => state.gameState.creatures);
    const [loading, setLoading] = useState(false);

    // Function to handle HP update
    const handleHPUpdate = async (creatureId: string, newHP: number) => {
        try {
            setLoading(true);
            await setCreatureHP(creatureId, newHP);
        } catch (error) {
            console.error('Error updating HP:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Player Stats</h3>
            <ul>
                {creatures.length > 0 ? (
                    creatures.map((creature) => (
                        <li key={creature.creatureId}>
                            {creature.name} ({creature.subrace}): {getCreatureHP(creature.turnResources)} HP
                            <button
                                onClick={() => handleHPUpdate(creature.creatureId, getCreatureHP(creature.turnResources) + 10)}
                                disabled={loading}
                            >
                                Increase HP by 10
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No players found</li>
                )}
            </ul>
        </div>
    );
};

// Helper function to extract HP from turnResources
const getCreatureHP = (turnResources: { type: string; amount: number }[]): number => {
    const hpResource = turnResources.find((resource) => resource.type === 'HP');
    return hpResource ? hpResource.amount : 0;
};

export default PlayerControls;
