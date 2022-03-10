import React from 'react';

const ControlledInput = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return <input type="text" onChange={handleChange} />;
};

export default ControlledInput;
