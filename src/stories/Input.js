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
<<<<<<< HEAD
  const { data, isSuccess, isError } = useGetRecommendsQuery(searchWord);
=======
  const { data, isLoading, isSuccess, isError } = useGetRecommendsQuery(searchWord);
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
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
<<<<<<< HEAD
      isData &&
        setLocalRecommends([
          ...localRecommends,
          {
            searchWord: searchWord.trim(),
            recommends: data,
          },
        ]);
=======
      isData && setLocalRecommends([...localRecommends, {
        searchWord: searchWord.trim(),
        recommends: data
      }]);
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
    }
  }, [localRecommends, setLocalRecommends, data]);
  useEffect(() => {
    data && data.length !== 0 && setAutoValue(data[index]?.name);
  }, [data, index]);
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
  // 키보드 이벤트 관리
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((prev) => (prev === null ? data.length - 1 : prev === 0 ? null : prev - 1));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((prev) => (prev === null ? 0 : prev === data.length - 1 ? null : prev + 1));
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
<<<<<<< HEAD

  const makeList = (data) => {
    return data.map((item, idx) => {
      if (idx > 5 && !modal) return null;
      return (
=======
  const renderFetchData = () => {
    if (localData.length === 0 && inputValue && isSuccess && data) {
      return (data.map((item, idx) =>
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
        <List
          key={idx}
          selected={index === idx}
          onClick={() => {
            setInputValue(item.name);
            setAutoValue('');
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
<<<<<<< HEAD
      );
    });
  };

  const renderFetchData = () => {
    if (localData.length === 0 && inputValue && isSuccess && data) {
      return makeList(data);
=======
      ));
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
    }
  };
  const renderLocalData = () => {
    if (localData.length > 0) {
<<<<<<< HEAD
      return makeList(localData);
=======
      return (localData.map((item, idx) =>
        <List
          key={idx}
          selected={index === idx}
          onClick={() => {
            setInputValue(item.name);
            setAutoValue('');
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
      ));
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
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
<<<<<<< HEAD
            autoFocus={modal}
=======
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
            modal={modal}
            placeholder={label}
            onChange={handleChange}
            value={autoValue || inputValue}
            onFocus={() => setFocus(true)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
        </InputWrapper>
        {modal || <Button buttonColor={buttonColor}>검색</Button>}
      </Container>
      {focus && inputValue && (
        <Recommend modal={modal}>
<<<<<<< HEAD
          {isLocalLoading && <LoadingText>검색 중...</LoadingText>}
          {!isLocalLoading && (
=======
          {isLoading && <LoadingText>검색 중...</LoadingText>}
          {!isLoading && (
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
            <>
              <First>추천 검색어</First>
              {renderFetchData()}
              {renderLocalData()}
            </>
          )}
          {isError && <First>데이터를 불러오던 중 에러가 발생했습니다:(</First>}
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
<<<<<<< HEAD
  modal: PropTypes.bool,
=======
  modal: PropTypes.bool
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
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
<<<<<<< HEAD
    props.modal
      ? `width: 100%; 
  height: 56px; 
  padding: 0 20px;
  border-bottom: 2px solid #007be9;`
      : 'height: 70px'};
=======
  props.modal
    ? `width: 100%; 
  height: 56px; 
  padding: 0 20px;
  border-bottom: 2px solid #007be9;`
    : 'height: 70px'};
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f

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
<<<<<<< HEAD
    props.modal
      ? `
    width: 100%;
    top: 56px;
  `
      : `
=======
  props.modal
    ? `
    width: 100%;
    top: 56px;
  `
    : `
>>>>>>> 5a0617d3fd79e6f52621360b22f0712e2b951a8f
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

// 현재 인덱스가 요소의 인덱스가 같으면 배경색을 바꿔 선택되었음을 보여줌
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
