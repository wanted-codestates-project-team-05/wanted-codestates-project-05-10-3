import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../stories/Input';

const Search = () => {
  const [modal, setModal] = useState(false);

  if (modal)
    return (
      <ModalContainer>
        <Input
          label={'질환명을 입력해 주세요.'}
          backgroundColor={'white'}
          buttonColor={'#007be9'}
          setModal={setModal}
          modal={modal}
        />
      </ModalContainer>
    );

  return (
    <Container>
      <TextWrapper>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </TextWrapper>
      <Input label={'질환명을 입력해 주세요.'} backgroundColor={'white'} buttonColor={'#007be9'} setModal={setModal} />
    </Container>
  );
};

const ModalContainer = styled.div`
  box-sizing: border-box;
  width: calc(100vw - (100vw - 100%));
  height: 100vh;
  background-color: white;
  display: flex;
`;

const Container = styled.div`
  background-color: #cae9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  height: 100vh;
  position: relative;
`;

const TextWrapper = styled.div`
  width: 670px;
  font-size 34px;
  font-weight 700;
  letter-spacing -0.612px;
  line-height 54.4px;
  text-align center;
  margin-bottom: 20px;
  @media only screen and (max-width: 1024px) {
    font-size: 20px;
    letter-spacing: -0.36px;
    line-height: 32px;
  }
`;

export default Search;
