import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appReducer from '../appSlice';
import { customerApiSlice } from '../api/customerApiSlice';
import { loginApiSlice } from '../api/loginApiSlice';
import { driverApiSlice } from '../api/driverApiSlice';
import { operatorApiSlice } from '../api/operatorApiSlice';
import { priceApiSlice } from '../api/priceApiSlice';
import { bookingApiSlice } from '../api/bookingApiSlice';
import { vehicleApiSlice } from '../api/vehicleApiSlice';
import { adminApiSlice } from '../api/adminApiSlice';
import { reviewApiSlice } from '../api/reviewApiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    [customerApiSlice.reducerPath]: customerApiSlice.reducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    [driverApiSlice.reducerPath]: driverApiSlice.reducer,
    [operatorApiSlice.reducerPath]: operatorApiSlice.reducer,
    [priceApiSlice.reducerPath]: priceApiSlice.reducer,
    [bookingApiSlice.reducerPath]: bookingApiSlice.reducer,
    [vehicleApiSlice.reducerPath]: vehicleApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(customerApiSlice.middleware)
      .concat(loginApiSlice.middleware)
      .concat(driverApiSlice.middleware)
      .concat(operatorApiSlice.middleware)
      .concat(priceApiSlice.middleware)
      .concat(bookingApiSlice.middleware)
      .concat(vehicleApiSlice.middleware)
      .concat(adminApiSlice.middleware)
      .concat(reviewApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
