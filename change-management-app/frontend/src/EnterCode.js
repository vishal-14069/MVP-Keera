import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/submit/${code}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={handleChange}
        placeholder="Enter code"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterCode;
