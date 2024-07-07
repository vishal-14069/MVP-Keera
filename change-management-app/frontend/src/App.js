import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AskQuestion from './AskQuestion';
import NewEnterCode from './NewEnterCode';
import SubmitResponse from './SubmitResponse';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Decision Loop</h1>
          <nav>
            <ul>
              <li>
                <Link to="/ask">Ask a Question</Link>
              </li>
              <li>
                <Link to="/enter-code">Enter Code</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/ask" component={AskQuestion} />
            <Route path="/enter-code" component={NewEnterCode} />
            <Route path="/respond/:code" component={SubmitResponse} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
