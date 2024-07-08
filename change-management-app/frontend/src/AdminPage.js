import React, { Component } from 'react';
const API_URL = process.env.REACT_APP_API_URL || '/api';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
    };
  }

  componentDidMount() {
    const { code } = this.props.match.params;
    if (code) {
      this.fetchResponses(code);
    } else {
      console.error('No code provided in URL');
    }
  }

  fetchResponses = async (code) => {
    console.log('Fetching responses for code:', code);
    try {
      const response = await fetch(`${API_URL}responses/${code}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('Failed to fetch responses:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      this.setState({ responses: data.responses });
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  render() {
    const { responses } = this.state;
    return (
      <div>
        <h1>Admin Page</h1>
        {responses.length === 0 ? (
          <p>No responses found.</p>
        ) : (
          responses.map((response, index) => (
            <div key={index}>
              <h2>Response {index + 1}</h2>
              <p>Responses: {response.responses.join(', ')}</p>
              <p>Insights: {response.insights}</p>
              <p>Sentiment: {response.sentiment}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default AdminPage;
