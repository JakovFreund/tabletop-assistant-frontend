import React, { useEffect, useState } from 'react';
import { getGameState, updateCreatureHP } from '../api'; // Import updateCreatureHP API

interface TurnResource{
    type: string;
    amount:number;
}

interface Creature {
    creatureId: string;
    name: string;
    subrace: string;
    turnResources: TurnResource[];
}

const PlayerStats = () => {
    const [creatures, setCreatures] = useState<Creature[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false); // Track loading state for updating HP

    // Long polling to fetch game state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGameState();
                setCreatures(data.creatures || []); // Set creatures
            } catch (error) {
                console.error('Error fetching gamestate data:', error);
            } finally {
                setTimeout(fetchData, 2000); // Polling every 2 seconds
            }
        };

        fetchData();
    }, []);

    // Function to handle HP update
    const handleHPUpdate = async (creatureId: string, newHP: number) => {
        try {
            setLoading(true); // Set loading state
            await updateCreatureHP(creatureId, newHP);
        } catch (error) {
            console.error('Error updating HP:', error);
        } finally {
            setLoading(false); // Clear loading state after update
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
const getCreatureHP = (turnResources: TurnResource[]):number => {
    const hpResource = turnResources.find((resource) => resource.type === 'HP');
    return hpResource ? hpResource.amount : 0;
};

export default PlayerStats;
