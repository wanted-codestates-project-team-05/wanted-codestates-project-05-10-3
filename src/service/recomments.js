import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const recommendsApi = createApi({
  reducerPath: 'recommends',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.clinicaltrialskorea.com',
    keepUnusedDataFor: 30,
  }),
  endpoints: (builder) => ({
    getRecommends: builder.query({
      //query 추가필요
      query: (searchWord) => `/api/v1/search-conditions/?name=${searchWord}`,
      keepUnusedDataFor: 5
    })
  })
});

export const { useGetRecommendsQuery } = recommendsApi;
