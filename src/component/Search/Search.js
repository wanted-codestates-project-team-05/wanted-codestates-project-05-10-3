import React, { useState } from 'react';
import { Blue } from '../../stories/Input.stories';
import styled from 'styled-components';

const Search = () => {
  return (
    <Container>
      <TextWrapper>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </TextWrapper>
      <Blue />
    </Container>
  );
};

const Container = styled.div`
  background-color: #cae9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  height: 100vh;
`;

const TextWrapper = styled.div`
  width: 670px;
<<<<<<< HEAD
  font-size: 34px;
  font-weight: 700;
  height: 108.781px;
  letter-spacing: -0.612px;
  line-height: 54.4px;
  margin-bottom: 20px;
  text-align: center;
=======
  font-size 34px;
  font-weight 700;
  height 108.781px;
  letter-spacing -0.612px;
  line-height 54.4px;
  margin-bottom 20px;
  text-align center;
>>>>>>> 2e33adf (feat: 기본적인 대문 디자인 및 input 컴포넌트 기본 기능)
`;

export default Search;
