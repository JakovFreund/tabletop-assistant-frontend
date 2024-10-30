import AllPlayerStats from './AllPlayerStats';
import PlayerStats from './PlayerStats';

import { useDispatch } from 'react-redux';

/* eslint-disable */

const PlayerInterface = () => {
    const dispatch = useDispatch();


    return (
        <div>
            <h1>Player Interface</h1>
            {/* Show DM login button only in Player interface */}
            <PlayerStats />
            <AllPlayerStats />
        </div>
    );
};

export default PlayerInterface;
