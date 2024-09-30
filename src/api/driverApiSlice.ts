import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateDriver, TCreateDriverRes, TDriverNearBy } from '../types/driver';

export const driverApiSlice = createApi({
  reducerPath: 'driverApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<TCreateDriverRes, TCreateDriver>({
      query: (data) => ({
        url: '/driver/register',
        method: 'POST',
        body: data,
      }),
    }),
    getNearBy: builder.query<any, TDriverNearBy>({
      query: ({radius, lat, lng}) => ({
        url: 'driver/nearby',
        params: { radius, lat, lng }
      }),
    }),
    getDriver: builder.query<any, number>({
        query: (id) => ({
            url : `/driver`,
            params: { id }
        }),
    }),
    getDrivers: builder.query<any, void>({
        query: (id) => ({
            url : `/driver`,
            method: 'GET'
        }),
    }),
  }),
});

export const { useRegisterMutation, useGetDriverQuery, useGetDriversQuery, useGetNearByQuery } = driverApiSlice