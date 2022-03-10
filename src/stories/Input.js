import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Input({ label, backgroundColor, buttonColor }) {
  const [inputValue, setInputValue] = useState('');
  const [autoValue, setAutoValue] = useState('');
  const [index, setIndex] = useState(null);
  const [focus, setFocus] = useState(false);
  // api 데이터
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 키보드 이벤트 관리
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((prev) => (prev === null ? list.length - 1 : prev === 0 ? null : prev - 1));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((prev) => (prev === null ? 0 : prev === list.length - 1 ? null : prev + 1));
    }
    if (e.key === 'Enter') {
      setInputValue(autoValue);
      setAutoValue('');
      setFocus(false);
      e.currentTarget.blur();
    }
  };

  return (
    <Container>
      <InputWrapper backgroundColor={backgroundColor}>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
            fill="#32383E"
          ></path>
        </svg>
        <SearchInput
          placeholder={label}
          onChange={(e) => {
            setInputValue(e.target.value);
            setAutoValue('');
          }}
          value={autoValue || inputValue}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={handleKeyDown}
        />
      </InputWrapper>
      <Button buttonColor={buttonColor}>검색</Button>

      {/* 추천 검색어 목록 */}
      {focus && inputValue && (
        <Recommend>
          {isLoading && <span>검색 중... </span>}
          {!isLoading &&
            list.map((item, idx) => {
              return (
                <List
                  key={idx}
                  selected={index === idx}
                  onClick={() => {
                    setInputValue(item);
                    setAutoValue('');
                    setFocus(false);
                  }}
                >
                  {item}
                </List>
              );
            })}
        </Recommend>
      )}
    </Container>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonColor: PropTypes.string,
};

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 70px;
  align-items: center;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 570px;
  height: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 50px 0 0 50px;
  background-color: ${(props) => `${props.backgroundColor}`};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  width: 100%;
  background-color: transparent;
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
`;

const Recommend = styled.div`
  position: absolute;
  top: 90px;
  width: 670px;
  height 60px;
  background-color: white;
  border-radius: 10px;
`;

// 현재 인덱스가 요소의 인덱스가 같으면 배경색을 바꿔 선택되었음을 보여줌
const List = styled.div`
  padding: 2px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'lightgray' : 'white')};
  &:hover {
    background-color: lightgray;
  }
`;
