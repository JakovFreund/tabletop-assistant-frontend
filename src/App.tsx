import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './styles/App.scss';
import DMInterface from './components/DMInterface';
import PlayerInterface from './components/PlayerInterface';
import { connectDevice, generateUUID } from './api';
import { fetchConnectedDevices } from './redux/connectedDevicesSlice';
import { setCreatureId, setDungeonMaster } from './redux/deviceSlice';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isDM = useSelector((state: RootState) => state.device.dungeonMaster);
    const deviceMappings = useSelector((state: RootState) => state.gameState.deviceMappings);
    const localStorageDeviceId = 'tabletopAssistantDeviceId'
    const [deviceMapped, setDeviceMapped] = useState(false);
    const deviceIdRef = useRef<string | null>(null);



    const handleDeviceConnect = async (deviceId: string) => {
        try {
            await connectDevice(deviceId);
        } catch (error) {
            console.error('Error connecting device:', error);
        } finally {
        }
    };

    useEffect(() => {
        const initializeDevice = async () => {
            let storedDeviceId = localStorage.getItem(localStorageDeviceId);
            if (!storedDeviceId) {
                try {
                    const newDeviceId = await generateUUID();
                    storedDeviceId = newDeviceId;
                    if (!storedDeviceId) {
                        console.log(storedDeviceId);
                        throw new Error('DeviceId generation error: deviceId is null. Check generateUUID()');
                    }
                    localStorage.setItem(localStorageDeviceId, storedDeviceId);
                } catch (error) {
                    console.error('Error generating UUID:', error);
                    return;
                }
            }

            deviceIdRef.current = storedDeviceId;
            await handleDeviceConnect(storedDeviceId);
        };

        initializeDevice();
    }, []);

    useEffect(() => {
        if (!deviceIdRef.current) return;

        for (const deviceMapping of deviceMappings) {
            if (deviceMapping.deviceId === deviceIdRef.current) {
                dispatch(setCreatureId(deviceMapping.creatureId));
                dispatch(setDungeonMaster(deviceMapping.dungeonMaster));
                setDeviceMapped(true);
            }
        }
    }, [deviceMappings, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchGameState());
            } catch {
                console.error('Error fetching game state data');
            }
        };

        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [dispatch]);


    useEffect(() => {
        const fetchConnectedDevicesData = async () => {
            try {
                dispatch(fetchConnectedDevices());
            } catch {
                console.error('Error fetching connected devices data');
            }
        };

        const connectedDevicesIntervalId = setInterval(fetchConnectedDevicesData, 2000);

        return () => clearInterval(connectedDevicesIntervalId);
    }, [dispatch]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    {deviceMapped ? (<div></div>) : <div>Device not mapped! DeviceId: {deviceIdRef.current}</div>}
                    {isDM ? (
                        <DMInterface />
                    ) : (
                        <PlayerInterface />
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
