import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EnterCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleChange = (e) => {
    this.setState({ code: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/submit/${this.state.code}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.code}
          onChange={this.handleChange}
          placeholder="Enter code"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(EnterCode);
