import React from 'react';
import { withRouter } from 'react-router-dom';

function EnterCode({ history }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/respond/test');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

export default withRouter(EnterCode);
