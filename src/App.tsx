import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './style.scss';
import MasterInterface from './components/master/MasterInterface';
import PlayerInterface from './components/player/PlayerInterface';
import { connectDevice, generateUUID } from './api';
import { setCreatureId, setDungeonMaster } from './redux/deviceSlice';
import Modal from './components/modals/Modal';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isDM = useSelector((state: RootState) => state.device.dungeonMaster);
    const deviceMappings = useSelector((state: RootState) => state.gameState.deviceMappings);
    const devices = useSelector((state: RootState) => state.gameState.devices);
    const localStorageDeviceId = 'tabletopAssistantDeviceId'
    const [thisDeviceMapped, setThisDeviceMapped] = useState(false);
    const thisDeviceIdRef = useRef<string | null>(null);


    // adds deviceId to connectedDevices list on backend
    const handleDeviceConnect = async (deviceId: string) => {
        try {
            await connectDevice(deviceId);
        } catch (error) {
            console.error('Error connecting device:', error);
        } finally {
        }
    };

    // gets id from localStorage or fetches newly generated if doesnt exist
    useEffect(() => {
        const initializeDevice = async () => {
            let storedDeviceId = localStorage.getItem(localStorageDeviceId);
            if (!storedDeviceId) {
                console.log("DeviceId not found in localStorage. Generating new one...")
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

            thisDeviceIdRef.current = storedDeviceId;
            await handleDeviceConnect(storedDeviceId);
        };

        initializeDevice();
    }, []);


    // mapping creatureId and dungeonMaster boolean
    useEffect(() => {
        if (!thisDeviceIdRef.current) return;

        const matchedDevice = devices.find(device => device.deviceId === thisDeviceIdRef.current);
        if (matchedDevice) {
            const matchedMapping = deviceMappings.find(mapping => mapping.deviceNickname === matchedDevice.deviceNickname);
            if (matchedMapping) {
                dispatch(setCreatureId(matchedMapping.creatureId));
                dispatch(setDungeonMaster(matchedMapping.dungeonMaster));
                setThisDeviceMapped(true);
            }
        }
    }, [thisDeviceIdRef, deviceMappings, devices, dispatch]);


    // fetchGameState
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchGameState());
            } catch {
                console.error('Error fetching game state data');
            }
        };

        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId);
    }, [dispatch]);


    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <main className="App-body">
                <Modal />
                {thisDeviceMapped ? (
                    isDM ? (<MasterInterface />) : (<PlayerInterface />
                    )
                ) : <h2>Device not mapped! DeviceId: {thisDeviceIdRef.current}</h2>}
            </main>
        </div>
    );
}

export default App;
