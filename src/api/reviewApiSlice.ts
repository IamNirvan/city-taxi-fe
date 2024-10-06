import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TRatingCreate } from '../types/booking';

export const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addReview: builder.mutation<any, TRatingCreate>({
      query: (data) => ({
        url: '/rating',
        method: 'POST',
        body: [data],
      }),
    }),
  }),
});

export const { useAddReviewMutation } = reviewApiSlice;
