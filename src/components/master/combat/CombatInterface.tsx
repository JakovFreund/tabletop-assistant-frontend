import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import CombatInterfaceCard from './CombatInterfaceCard';
import CombatLog from './CombatLog';

const CombatInterface = () => {
    const creatures = useSelector((state: RootState) => state.gameState.creatures);

    return (
        <div>
            <h3>Creature Mappings</h3>
            <ul>
                {creatures.length > 0 ? (
                    creatures.map((creature) => {
                        return <li key={creature.creatureId}><CombatInterfaceCard
                            creatureId={creature.creatureId}
                            creatureName={creature.name}
                        /></li>
                    })
                ) : (
                    <li>No creatures found</li>
                )}
            </ul>
            <CombatLog />
        </div>
    );
};


export default CombatInterface
