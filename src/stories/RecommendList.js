import React, { useState } from 'react';
import styled from 'styled-components';

export default function RecommendList({ setInputValue, setAutoValue, setFocus, index }) {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState(['소아암', '혈액암', '피부암', '췌장암']);
  return (
    <Recommend>
      {isLoading && <LoadingText>검색 중...</LoadingText>}
      {!isLoading && (
        <>
          <First>추천 검색어</First>
          {list.map((item, idx) => {
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
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
                    fill="#32383E"
                  ></path>
                </svg>
                {item}
              </List>
            );
          })}
        </>
      )}
    </Recommend>
  );
}

const Recommend = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: 290px;
  width: 670px;
  background-color: white;
  border-radius: 20px;
  list-style: none;
  min-height: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  @media only screen and (max-width: 1024px) {
    display: none;
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
