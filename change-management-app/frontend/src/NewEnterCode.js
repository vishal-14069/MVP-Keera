import React from 'react';
import { useHistory } from 'react-router-dom';

function NewEnterCode() {
  const history = useHistory();

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

export default NewEnterCode;