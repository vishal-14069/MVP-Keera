import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
        <Routes>
            <Route path="/" element={<AskQuestion />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/enter-code" element={<EnterCode />} />
            <Route path="/submit/:code" element={<SubmitResponse />} />
            <Route path="/admin/:code" element={<AdminPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

