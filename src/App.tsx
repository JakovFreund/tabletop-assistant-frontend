import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './styles/App.scss';
import DMInterface from './components/DMInterface';
import PlayerInterface from './components/PlayerInterface';
import { connectDevice, generateUUID } from './api';
import { fetchConnectedDevices } from './redux/connectedDevicesSlice';
import ConnectedDevices from './components/ConnectedDevices';
import { setCreatureId, setDungeonMaster } from './redux/deviceSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isDM = useSelector((state: RootState) => state.device.dungeonMaster);
  const deviceMappings =  useSelector((state: RootState) => state.gameState.deviceMappings);
  //const devices =  useSelector((state: RootState) => state.gameState.devices);
  const localStorageDeviceId = 'tabletopAssistantDeviceId'


  const handleDeviceConnect = async (deviceId: string) => {
    try {
      await connectDevice(deviceId);
    } catch (error) {
        console.error('Error connecting device:', error);
    } finally {
    }
};

  useEffect(() => {
    const fetchUUID = async () => {
      let deviceId = localStorage.getItem(localStorageDeviceId);
      if (!deviceId) {
        try {
          const data = await generateUUID(); 
          deviceId = data;
          if(!deviceId){
            console.log(deviceId);
            throw new Error('DeviceId generation error: deviceId is null. Check generateUUID()');
          }
          localStorage.setItem(localStorageDeviceId, deviceId);

        } catch (error) {
          console.error('Error fetching UUID:', error);
        }
      }

      if(!deviceId){
        console.log(deviceId);
        throw new Error('Error: deviceId is null.');
      }

      await handleDeviceConnect(deviceId);
      console.log('Device ID:', deviceId);

      for (const deviceMapping of deviceMappings){
        console.log("a "+deviceMapping.deviceId);
        console.log("b "+deviceId);
        if (deviceMapping.deviceId === deviceId){
          dispatch(setCreatureId(deviceMapping.creatureId));
          dispatch(setDungeonMaster(deviceMapping.dungeonMaster));
        }
      }
    

      
      // 
      // 
      



      // TODO set a creatureId based on the deviceId and gamestate existing data, and save the creatureId to redux
      // TODO if deviceId not found in gamestate render the deviceId on screen
      // TODO move PlayerInterface.handleDMLogin() to this class and call it here // do i need the dm login??

    };


    fetchUUID();
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

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

    // Fetch connected devices at regular intervals
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
          <ConnectedDevices /> 
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
