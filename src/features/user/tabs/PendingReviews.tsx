import React, { useEffect } from 'react';
import { useLazyGetBookingByidQuery } from '../../../api/bookingApiSlice';
import { CircularProgress } from '@mui/material';
import UserRideCrd from '../../../components/userRideCard';
import LogoContainer from '../../../components/logoContainer';

interface Props {
  userId: number;
  oReviewRide: (data: any) => void;
  onPayRide: (data: any) => void;
}

const PendingReviews = ({ userId, oReviewRide, onPayRide }: Props) => {
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] =
    useLazyGetBookingByidQuery();

  useEffect(() => {
    triggerGetBookings({ customerId: userId, status: 'PAID' });
  }, []);

  return (
    <div>
      {isBookingsLoading && <CircularProgress />}
      {bookingData ? (
        bookingData.map((booking, index) => (
          <UserRideCrd
            key={index}
            data={booking}
            oReviewRide={() => {
              triggerGetBookings({ customerId: userId, status: 'PAID' });
              oReviewRide(booking);
            }}
            onPayRide={() => {
              triggerGetBookings({ customerId: userId, status: 'PAID' });
              onPayRide(booking);
            }}
          />
        ))
      ) : (
        <div className="no-data">
          {' '}
          <LogoContainer />
          <h3 className="no-vhicle">You have no rides yet.</h3>
        </div>
      )}
    </div>
  );
};

export default PendingReviews;
