import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './style.scss';
import MasterInterface from './components/master/MasterInterface';
import PlayerInterface from './components/player/PlayerInterface';
import { connectDevice, generateUUID } from './api';
import { fetchConnectedDevices } from './redux/connectedDevicesSlice';
import { setCreatureId, setDungeonMaster } from './redux/deviceSlice';
import Modal from './components/modals/Modal';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isDM = useSelector((state: RootState) => state.device.dungeonMaster);
    const deviceMappings = useSelector((state: RootState) => state.gameState.deviceMappings);
    const devices = useSelector((state: RootState) => state.gameState.devices);
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

        const matchedDevice = devices.find(device => device.deviceId === deviceIdRef.current);
        if (matchedDevice) {
            const matchedMapping = deviceMappings.find(mapping => mapping.deviceNickname === matchedDevice.deviceNickname);
            if (matchedMapping) {
                dispatch(setCreatureId(matchedMapping.creatureId));
                dispatch(setDungeonMaster(matchedMapping.dungeonMaster));
                setDeviceMapped(true);
            }
        }
    }, [deviceMappings, devices, dispatch]);

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
            <img src={logo} className="App-logo" alt="logo" />
            <main className="App-body">
                <Modal />
                {deviceMapped ? (<div></div>) : <div>Device not mapped! DeviceId: {deviceIdRef.current}</div>}
                {isDM ? (
                    <MasterInterface />
                ) : (
                    <PlayerInterface />
                )}

            </main>
        </div>
    );
}

export default App;
