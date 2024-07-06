import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EnterCode() {
  const [code, setCode] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/respond/${code}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EnterCode;