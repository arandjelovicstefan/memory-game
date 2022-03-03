import { Route, Switch } from 'react-router-dom';
import Error404 from './pages/Error/ErrorPage';
import Game from './pages/Game/GamePage';
import Home from './pages/Home/HomePage';
import Scoreboard from './pages/Scoreboard/ScoreboardPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/game' component={Game} />
      <Route exact path='/scoreboard' component={Scoreboard} />
      <Route exact path='*' component={Error404} />
    </Switch>
  );
}

export default App;
