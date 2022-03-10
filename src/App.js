import GlobalStyle from './GlobalStyle';
import React from 'react';
import Search from './component/Search/Search';
import ControlledInput from './component/Search/ControlledInput';

function App() {

  return (
    <>
      <GlobalStyle />
      <h1>React Toolkit && RTK Query</h1>
      <Search />
      <ControlledInput />
    </>
  );
}

export default App;
