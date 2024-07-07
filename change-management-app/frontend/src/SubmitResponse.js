import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SubmitResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      responses: [],
      submissionStatus: null, // New state variable for submission status
    };
  }

  componentDidMount() {
    const { code } = this.props.match.params;
    this.fetchQuestions(code);
  }

  fetchQuestions = async (code) => {
    console.log('Fetching questions for code:', code);
    try {
      const response = await fetch(`http://localhost:5001/api/questions/${code}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('Failed to fetch questions:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      this.setState({
        questions: data.questions,
        responses: new Array(data.questions.length).fill('')
      });
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { code } = this.props.match.params;
    const { responses } = this.state;
    console.log('Submitting responses:', responses);
    try {
      const response = await fetch('http://localhost:5001/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
        },
        body: JSON.stringify({ code, responses }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('Failed to submit responses:', response.statusText);
        this.setState({ submissionStatus: 'Failed to submit responses' }); // Update status on failure
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      this.setState({ submissionStatus: 'Responses submitted successfully!' }); // Update status on success
    } catch (error) {
      console.error('Error during fetch:', error);
      this.setState({ submissionStatus: 'Error during submission' }); // Update status on error
    }
  };

  handleResponseChange = (index, value) => {
    const newResponses = [...this.state.responses];
    newResponses[index] = value;
    this.setState({ responses: newResponses });
  };

  render() {
    const { questions, responses, submissionStatus } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              <textarea
                value={responses[index]}
                onChange={(e) => this.handleResponseChange(index, e.target.value)}
                placeholder="Your response..."
              />
            </div>
          ))}
          <button type="submit">Submit Responses</button>
        </form>
        {submissionStatus && <p>{submissionStatus}</p>} {/* Display submission status */}
      </div>
    );
  }
}

export default withRouter(SubmitResponse);
