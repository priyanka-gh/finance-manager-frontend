import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Savings from './components/Savings/Savings';
import Expense from './components/Expense/Expense';
import Income from './components/Income/Income';
import NavBar from './components/Navbar/NavBar';
import {useDataLayerValue} from './util/DataLayer';

function App() {

  const [{user}] = useDataLayerValue();

  if(window.location.pathname === '/signup') {
    return <Signup/>
  } else if(!user) {
    return <Login/>
  }

  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Switch>
          <Route path="/" exact render={() => <Home user={user}/>}></Route>
          <Route path="/savings" exact render={() => <Savings user={user}/>}></Route>
          <Route path="/income" exact render={() => <Income user={user}/>}></Route>
          <Route path="/expenses" exact render={() => <Expense user={user}/>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
