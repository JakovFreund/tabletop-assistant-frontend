import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './styles/App.scss';
import DMInterface from './components/DMInterface';
import PlayerInterface from './components/PlayerInterface';
import { generateUUID } from './api';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isDM = useSelector((state: RootState) => state.dm.isDM);

  useEffect(() => {
    const fetchUUID = async () => {
      let deviceId = localStorage.getItem('deviceId');

      if (!deviceId || deviceId === "deviceId-generation-error") {
        try {
          const data = await generateUUID(); 
          deviceId = data.uuid;
          if(!deviceId){
            deviceId = "deviceId-generation-error"
          }
          localStorage.setItem('deviceId', deviceId); // Store the UUID in localStorage
        } catch (error) {
          console.error('Error fetching UUID:', error);
        }
      }

      console.log('Device ID:', deviceId);
    };

    // TODO here i need to set a creatureId based on the deviceId and gamestate existing data, and save the creatureId to redux

    fetchUUID();
  }, []);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
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
