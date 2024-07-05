import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AskQuestion from './AskQuestion';
import SubmitResponse from './SubmitResponse';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Change Management Insights</h1>
          <nav>
            <ul>
              <li>
                <Link to="/ask">Ask a Question</Link>
              </li>
              <li>
                <Link to="/respond">Submit a Response</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/ask" component={AskQuestion} />
          <Route path="/respond" component={SubmitResponse} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
