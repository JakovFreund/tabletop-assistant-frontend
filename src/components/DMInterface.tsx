import React, { useEffect, useState } from 'react';
import PlayerControls from './PlayerControls';

// DM Interface Component
const DMInterface = () => {
    return (
        <div>
            <h1>Dungeon Master UI</h1>
            {/* DM-specific content */}
            <PlayerControls />
        </div>
    );
};

export default DMInterface;