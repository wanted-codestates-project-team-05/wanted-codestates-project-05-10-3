import React, { useState } from 'react';
import { useGetRecommendsQuery } from '../../service/recomments';

const ControlledInput = () => {
  const [input, setInput] = useState();
  const { data, error, isLoading, isSuccess, isError } = useGetRecommendsQuery(input);
  const handleChange = async (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <input type="text" onChange={handleChange} />
      {isLoading && 'Loading...'}
      {isError && error.message}
      {isSuccess && data && data.map((recommend) => <h1 key={recommend.id}>{recommend.name}</h1>)}
    </>
  );
};

export default ControlledInput;
