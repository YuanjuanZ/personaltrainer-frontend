import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/customers" component={CustomerList} />
          <Route path="/trainings" component={TrainingList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
