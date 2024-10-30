import PlayerControls from './PlayerControls';
import ConnectedDevices from './ConnectedDevices';

// DM Interface Component
const DMInterface = () => {
    return (
        <div>
            <h1>Dungeon Master UI</h1>
            <ConnectedDevices /> 
            {/* DM-specific content */}
            <PlayerControls />
        </div>
    );
};

export default DMInterface;