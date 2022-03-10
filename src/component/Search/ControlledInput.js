import React, { useEffect, useState } from 'react';
import { useGetRecommendsQuery } from '../../service/recomments';
import useLocalStorage from '../../hooks/useLocalStorage';

const ControlledInput = () => {
    const [input, setInput] = useState();
    const [localRecommends, setLocalRecommends] = useLocalStorage('localRecommends', []);
    const [timer, setTimer] = useState(0);
    const [searchWord, setSearchWord] = useState();
    const { data, error, isLoading, isSuccess, isError } = useGetRecommendsQuery(searchWord);
    useEffect(() => {
      if (searchWord && data) {
        if (localRecommends.length > 5) {
          let newLocalRecommends = localRecommends;
          newLocalRecommends.shift();
          setLocalRecommends(newLocalRecommends);
        }
        let saveData = true;
        if (localRecommends.length >= 1) {
          localRecommends.forEach((recommend) => {
            if (recommend.searchWord.replace(/(\s*)/g, "") === searchWord.replace(/(\s*)/g, "")) {
              saveData = false;
            }
          });
        }
        saveData && setLocalRecommends([...localRecommends, {
          searchWord: searchWord,
          recommends: data
        }]);
      }
    }, [data]);

    const handleChange = async (event) => {
      setInput(event.target.value);
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        if (event.target.value !== '') {
          setSearchWord(event.target.value);
        }
      }, 800);
      setTimer(newTimer);
    };

    return (
      <>
        <input type="text" onChange={handleChange} />
        {isLoading && 'Loading...'}
        {isError && error.message}
        {isSuccess && data && input && data.map((recommend) => <h1 key={recommend.id}>{recommend.name}</h1>)}
      </>
    );
  }
;

export default ControlledInput;
