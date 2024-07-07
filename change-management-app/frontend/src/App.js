import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AskQuestion from './AskQuestion';
import EnterCode from './EnterCode';
import SubmitResponse from './SubmitResponse';
import AdminPage from './AdminPage';
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
            <Route path="/enter-code" component={EnterCode} />
            <Route path="/submit/:code" component={SubmitResponse} />
            <Route path="/admin/:code" component={AdminPage} />
            <Route path="/admin" component={AdminPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
