import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchGameState } from './redux/gameStateSlice';
import logo from './logo.svg';
import './styles/App.scss';
import DMInterface from './components/DMInterface';
import PlayerInterface from './components/PlayerInterface';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isDM = useSelector((state: RootState) => state.dm.isDM); // Get isDM from Redux

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchGameState()); // Fetch game state
      } catch {
        console.error('Error fetching game state data');
      }
    };

    // Use setInterval to poll the API every 2 seconds
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
