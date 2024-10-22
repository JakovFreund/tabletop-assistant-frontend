import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import logo from './logo.svg';
import './App.css';
import DMInterface from './components/DMInterface';
import PlayerInterface from './components/PlayerInterface';

function App() {
  const isDM = useSelector((state: RootState) => state.dm.isDM); // Get isDM from Redux

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
