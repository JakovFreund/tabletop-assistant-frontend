import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PlayerStats = () => {
    const creatures = useSelector((state: RootState) => state.gameState.creatures);

    return (
        <div>
            <h3>Player Stats</h3>
            <ul>
                {creatures.length > 0 ? (
                    creatures.map((creature) => (
                        <li key={creature.creatureId}>
                            {creature.name} ({creature.subrace}): {getCreatureHP(creature.turnResources)} HP
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

export default PlayerStats;
