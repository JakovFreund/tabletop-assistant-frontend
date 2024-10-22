import React, { useEffect, useState } from 'react';
import PlayerStats from './PlayerStats';

// DM Interface Component
const DMInterface = () => {
    return (
        <div>
            <h1>Dungeon Master UI</h1>
            {/* DM-specific content */}
            <PlayerStats />
        </div>
    );
};

export default DMInterface;