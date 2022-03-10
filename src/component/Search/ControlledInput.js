import React, { useEffect, useState } from 'react';
import { useGetRecommendsQuery } from '../../service/recomments';
import useLocalStorage from '../../hooks/useLocalStorage';

const ControlledInput = () => {
    const [input, setInput] = useState();
    const [localRecommends, setLocalRecommends] = useLocalStorage('localRecommends', []);
    const [timer, setTimer] = useState(0);
    const [searchWord, setSearchWord] = useState();
    const [localData, setLocalData] = useState([]);
    const { data, error, isLoading, isSuccess, isError } = useGetRecommendsQuery(searchWord);

    useEffect(() => {
      if (searchWord && data) {
        if (localRecommends.length > 5) {
          let newLocalRecommends = localRecommends;
          newLocalRecommends.shift();
          setLocalRecommends(newLocalRecommends);
        }
        let isData = true;
        if (localRecommends.length >= 1) {
          localRecommends.forEach((recommend) => {
            if (recommend.searchWord === searchWord.trim()) {
              isData = false;
            }
          });
        }
        isData && setLocalRecommends([...localRecommends, {
          searchWord: searchWord.trim(),
          recommends: data
        }]);
      }
    }, [data]);

    const handleChange = async (event) => {
      setInput(event.target.value);
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        const value = event.target.value;
        if (value !== '') {
          let isData = false;
          if (localRecommends.length >= 1) {
            localRecommends.forEach((recommend) => {
              recommend.searchWord === value.trim() && (isData = recommend.recommends);
            });
          }
          if (isData) {
            setLocalData(isData);
          } else {
            setLocalData([]);
            setSearchWord(value);
          }
        }
      }, 800);
      setTimer(newTimer);
    };

    return (
      <>
        <input type="text" onChange={handleChange} />
        {isLoading && 'Loading...'}
        {isError && error.message}
        {localData.length > 0 && localData.map((recommend) => <h1 key={recommend.id}>{recommend.name}</h1>)}
        {localData.length === 0 && isSuccess && input && data.map((recommend) =>
          <h1 key={recommend.id}>{recommend.name}</h1>)}
      </>
    );
  }
;

export default ControlledInput;
