import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useSessionStorage from '../hooks/useSessionStorage';
import { useGetRecommendsQuery } from '../service/recomments';

export default function Input({ label, backgroundColor, buttonColor, setModal, modal = false }) {
  const [inputValue, setInputValue] = useState('');
  const [autoValue, setAutoValue] = useState('');
  const [index, setIndex] = useState(null);
  const [focus, setFocus] = useState(false);
  const [localRecommends, setLocalRecommends] = useSessionStorage('localRecommends', []);
  const [timer, setTimer] = useState(0);
  const [searchWord, setSearchWord] = useState();
  const [localData, setLocalData] = useState([]);
  const { data, isSuccess, isError } = useGetRecommendsQuery(searchWord);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

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
      isData &&
        setLocalRecommends([
          ...localRecommends,
          {
            searchWord: searchWord.trim(),
            recommends: data,
          },
        ]);
    }
  }, [localRecommends, setLocalRecommends, data]);
  useEffect(() => {
    setIndex(null);
  }, [inputValue]);
  useEffect(() => {
    if (localData?.length) {
      setAutoValue(localData[index]?.name);
    } else if (data?.length) {
      setAutoValue(data[index]?.name);
    }
  }, [data, index, localData]);
  const handleChange = async (event) => {
    setInputValue(event.target.value);
    setAutoValue('');
    setIsLocalLoading(true);
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
      setIsLocalLoading(false);
    }, 800);
    setTimer(newTimer);
  };
  // ????????? ????????? ??????
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!modal) {
        setIndex((prev) => (prev === null ? 5 : prev === 0 ? null : prev - 1));
      } else {
        const list = localData.length !== 0 ? localData : data;
        setIndex((prev) => (prev === null ? list.length - 1 : prev === 0 ? null : prev - 1));
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!modal) {
        setIndex((prev) => (prev === null ? 0 : prev === 5 ? null : prev + 1));
      } else {
        const list = localData.length !== 0 ? localData : data;
        setIndex((prev) => (prev === null ? 0 : prev === list.length - 1 ? null : prev + 1));
      }
    }
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setInputValue(autoValue || inputValue);
      setAutoValue('');
      setFocus(false);
      e.currentTarget.blur();
    }
  };
  const handleClick = () => {
    if (window.innerWidth <= 1024) {
      setModal(true);
    }
  };

  const makeList = (data) => {
    return data.map((item, idx) => {
      if (idx > 5 && !modal) return null;
      return (
        <List
          key={idx}
          selected={index === idx}
          onClick={() => {
            setInputValue(item.name);
            setAutoValue('');
            console.log('first');
            setFocus(false);
          }}
        >
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
              fill="#32383E"
            />
          </svg>
          {item.name}
        </List>
      );
    });
  };

  const renderFetchData = () => {
    if (localData.length === 0 && inputValue && isSuccess && data) {
      return makeList(data);
    }
  };
  const renderLocalData = () => {
    if (localData.length > 0) {
      return makeList(localData);
    }
  };

  return (
    <Div>
      <Container onClick={handleClick} modal={modal}>
        <InputWrapper backgroundColor={backgroundColor} modal={modal}>
          {modal && (
            <BackArrow
              onClick={(e) => {
                e.stopPropagation();
                setModal(false);
              }}
            >
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#32383E" />
              </svg>
            </BackArrow>
          )}
          <SearchIcon modal>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
                fill="#32383E"
              />
            </svg>
          </SearchIcon>
          <SearchInput
            autoFocus={modal}
            modal={modal}
            placeholder={label}
            onChange={handleChange}
            value={autoValue || inputValue}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
        </InputWrapper>
        {modal || <Button buttonColor={buttonColor}>??????</Button>}
      </Container>
      {focus && inputValue && (
        <Recommend modal={modal} onBlur={() => setFocus(false)}>
          {isLocalLoading && <LoadingText>?????? ???...</LoadingText>}
          {!isLocalLoading && (
            <>
              <First>?????? ?????????</First>
              {renderFetchData()}
              {renderLocalData()}
            </>
          )}
          {isError && <First>???????????? ???????????? ??? ????????? ??????????????????:(</First>}
        </Recommend>
      )}
    </Div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonColor: PropTypes.string,
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.bool,
};

const Div = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;

  ${(props) =>
    props.modal
      ? `width: 100%; 
  height: 56px; 
  padding: 0 20px;
  border-bottom: 2px solid #007be9;`
      : 'height: 70px'};

  align-items: center;

  @media only screen and (max-width: 1024px) {
    height: 56px;
    width: 100%;
    padding: 0 20px;
    ${(props) => (props.modal ? '' : 'cursor: pointer')}
  }
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: ${(props) => (props.modal ? '100%' : '570px')};
  padding: ${(props) => (props.modal ? '0' : '20px 24px')};
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 50px 0 0 50px;
  background-color: ${(props) => `${props.backgroundColor}`};
  @media only screen and (max-width: 1024px) {
    border-radius: 50px;
    width: 100%;
    ${(props) => (props.modal ? '' : 'pointer-events: none')}
  }
`;

const BackArrow = styled.div`
  order: -1;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  font-size: 18px;
  order: ${(props) => (props.modal ? '1' : '2')};
  @media only screen and (max-width: 1024px) {
    order: 1;
  }
`;

const SearchIcon = styled.div`
  order: ${(props) => (props.modal ? '2' : '1')};
  @media only screen and (max-width: 1024px) {
    order: 2;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  color: white;
  background-color: ${(props) => `${props.buttonColor}`};
  width: 100px;
  height: 100%;
  border-radius: 0 50px 50px 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const Recommend = styled.ul`
  box-sizing: border-box;
  position: absolute;
  ${(props) =>
    props.modal
      ? `
    width: 100%;
    top: 56px;
  `
      : `
  width: 670px;
  top: 80px;
  `};
  background-color: white;
  border-radius: 20px;
  list-style: none;
  min-height: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  @media only screen and (max-width: 1024px) {
    ${(props) => (props.modal ? '' : 'display: none;')}
  }
`;

const LoadingText = styled.span`
  font-size: 13px;
  padding-left: 20px;
  color: gray;
`;

const First = styled.li`
  padding: 5px 20px;
  font-size: 13px;
  color: gray;
`;

// ?????? ???????????? ????????? ???????????? ????????? ???????????? ?????? ?????????????????? ?????????
const List = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 700;
  font-size: 15px;
  background-color: ${(props) => (props.selected ? 'lightgray' : 'white')};
  &:hover {
    background-color: lightgray;
  }
  display: flex;
  gap: 10px;
`;
