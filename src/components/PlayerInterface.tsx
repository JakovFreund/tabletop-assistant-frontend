import React, { useEffect, useState } from 'react';
import PlayerStats from './PlayerStats';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDM } from '../redux/dmSlice';

const PlayerInterface = () => {
    const dispatch = useDispatch();
    const isDM = useSelector((state: RootState) => state.dm.isDM);
    const [username, setUsername] = useState(''); // State for username input
    const [password, setPassword] = useState(''); // State for password input

    // Function to handle DM login
    const handleDMLogin = () => {
        // Ideally, perform some sort of authentication (e.g., password check)
        const hardcodedUsername = 'a';
        const hardcodedPassword = 'a';
        if (username === hardcodedUsername && password === hardcodedPassword) {
            dispatch(setDM(true)); // Dispatch action to set isDM to true
        } else {
            alert("Incorrect username or password.")
        }

    };

    return (
        <div>
            <h1>Player Interface</h1>
            {/* Show DM login button only in Player interface */}
            <PlayerStats />
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Updates username state on change
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Updates password state on change
                />
            </div>
            {!isDM && (
                <button onClick={handleDMLogin}>DM Login</button>
            )}
        </div>
    );
};

export default PlayerInterface;
