import React, { useEffect, useState } from 'react';
import { useGetRecommendsQuery } from '../../service/recomments';
import useLocalStorage from '../../hooks/useLocalStorage';

const ControlledInput = () => {
  const [input, setInput] = useState();
  const [localRecommends, setLocalRecommends] = useLocalStorage('localRecommends');
  const { data, error, isLoading, isSuccess, isError } = useGetRecommendsQuery(input);
  useEffect(() => {
    setLocalRecommends({ searchWord: input, recommends: data });
  }, [data]);
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
