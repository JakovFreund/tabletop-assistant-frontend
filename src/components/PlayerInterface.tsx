import { useState } from 'react';
import AllPlayerStats from './AllPlayerStats';
import PlayerStats from './PlayerStats';

import { useDispatch } from 'react-redux';


/* eslint-disable */

const PlayerInterface = () => {
    const dispatch = useDispatch();

    const [selectedComponent, setSelectedComponent] = useState('playerStats');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'playerStats':
                return <PlayerStats />

            case 'AllPlayerStats':
                return <AllPlayerStats />;
            default:
                return <div>Select a view from the menu</div>;
        }
    };


    return ( //TODO add player-interface.scss
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
                <h1>Player UI</h1>
                {renderComponent()}
            </div> 
        </div>
    );
};

export default PlayerInterface;
