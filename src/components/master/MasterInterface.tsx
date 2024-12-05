import { useState } from 'react';
import PlayerControls from './PlayerControls';
import ConnectedDevices from './ConnectedDevices';
import './MasterInterface.scss';
import DeviceMappings from './DeviceMappings';
import Card from '../Card';

const DMInterface = () => {
    const [selectedComponent, setSelectedComponent] = useState('connectedDevices');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'connectedDevices':
                return <ConnectedDevices />;
            case 'playerControls':
                return <PlayerControls />;
            case 'deviceMappings':
                return <DeviceMappings />;
            default:
                return <div>Select a view from the menu</div>;
        }
    };

    return (
        <div className="master-interface">
            <header className="App-header">
                {/*navigation toggle and save gamestate button*/}
                <Card onClick={() => console.log("a")}>Save Gamestate</Card>
            </header>
            <div className="master-interface-wrapper">
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
                    <button
                        onClick={() => setSelectedComponent('deviceMappings')}
                        className={selectedComponent === 'deviceMappings' ? 'active' : ''}
                    >
                        Device Mappings
                    </button>
                </div>

                <div className="content">
                    <h1>Master Interface</h1>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default DMInterface;
