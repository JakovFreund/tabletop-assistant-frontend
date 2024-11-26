import { useState } from 'react';
import PlayerControls from './PlayerControls';
import ConnectedDevices from './ConnectedDevices';
import '../styles/DMInterface.scss';

const DMInterface = () => {
    const [selectedComponent, setSelectedComponent] = useState('connectedDevices');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'connectedDevices':
                return <ConnectedDevices />;
            case 'playerControls':
                return <PlayerControls />;
            default:
                return <div>Select a view from the menu</div>;
        }
    };

    return (
        <div className="dm-interface">
            <div className="menu">
                <button
                    onClick={() => setSelectedComponent('connectedDevices')}
                    className={selectedComponent === 'connectedDevices' ? 'active' : ''}
                >
                    Connected Devices
                </button>
                <button
                    onClick={() => setSelectedComponent('playerControls')}
                    className={selectedComponent === 'playerControls' ? 'active' : ''}
                >
                    Player Controls
                </button>
            </div>

            <div className="content">
                <h1>Dungeon Master UI</h1>
                {renderComponent()}
            </div>
        </div>
    );
};

export default DMInterface;
