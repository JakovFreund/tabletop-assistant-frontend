import { useState } from 'react';
import PlayerControls from './playerControls/PlayerControls';
import ConnectedDevices from './connectedDevices/ConnectedDevices';
import './MasterInterface.scss';
import DeviceMappings from './deviceMappings/DeviceMappings';
import { saveGameState } from '../../api';
import CardButton from '../ui/CardButton';
import Image from '../ui/Image';
import MasterNavigation from './MasterNavigation';

const MasterInterface = () => {
    const [selectedComponent, setSelectedComponent] = useState('connectedDevices');
    const [showNavigation, setShowNavigation] = useState(true);

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

    const handleSaveGamestate = async () => {
        try {
            await saveGameState();
        } catch (error) {
            console.error('Error saving gamestate:', error);
        }
    }

    return (
        <div className="master-interface">
            <header>
                {/*navigation toggle and save gamestate button*/}
                <CardButton onClick={() => setShowNavigation(!showNavigation)}><Image src="sidebar-icon.svg" alt="sidebar" /></CardButton>
                <h2>Master Interface</h2>
                <CardButton className="button-gamestate" onClick={() => handleSaveGamestate()}>Save Gamestate</CardButton>
            </header>
            <div className="master-interface-wrapper">
                {showNavigation ? <MasterNavigation
                    setSelectedComponent={setSelectedComponent}
                    selectedComponent={selectedComponent}
                /> : null}
                <div className="content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default MasterInterface;
