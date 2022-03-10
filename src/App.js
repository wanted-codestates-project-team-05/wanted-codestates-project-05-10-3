import GlobalStyle from './GlobalStyle';
import React from 'react';
import Search from './component/Search/Search';
import { useGetRecommendsQuery } from './service/recomments';

function App() {
  const { data, error, isLoading, isSuccess, isError } = useGetRecommendsQuery("암");

  return (
    <>
      <GlobalStyle />
      <h1>React Toolkit && RTK Query</h1>
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess && data && data.map((recommend)=> <h1 key={recommend.id}>{recommend.name}</h1>)}
      <Search />
    </>
  );
}

export default App;
