import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const recommendsApi = createApi({
  reducerPath: 'recommends',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.clinicaltrialskorea.com'
  }),
  endpoints: (builder) => ({
    getRecommends: builder.query({
      //query 추가필요
      query: (searchWord) => `/api/v1/search-conditions/?name=${searchWord}`
    })
  })
});

export const { useGetRecommendsQuery } = recommendsApi;
