import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { Creature } from '../types';

const PlayerStats = () => {
    const creatures = useSelector((state: RootState) => state.gameState.creatures);
    const creatureId = useSelector((state: RootState) => state.device.creatureId);
    const [thisCreature, setThisCreature] = useState<Creature | null>(null);

    
    useEffect(() => {
        for (const creature of creatures){
            if (creature.creatureId===creatureId){
                console.log(creature.name);
                setThisCreature(creature);
            }
        }
    }, [creatures, creatureId]);

    

    //const thisCreature;

    return (
        <div>
            {thisCreature ? (
                <div>
                    <h1>{thisCreature.name}</h1>
                    <p>Subrace: {thisCreature.subrace}</p>
                    {/* Render additional stats if needed */}
                </div>
            ) : (
                <p>Creature not found.</p>
            )}
        </div>
    );
};


export default PlayerStats;
