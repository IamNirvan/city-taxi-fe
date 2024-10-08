import React, { useEffect } from 'react';
import { useLazyGetBookingByidQuery } from '../../../api/bookingApiSlice';
import { CircularProgress } from '@mui/material';
import UserRideCrd from '../../../components/userRideCard';
import LogoContainer from '../../../components/logoContainer';

interface Props {
  userId: number;
  onCompleteRide: (data: any) => void;
}

const AcceptedRides = ({ userId, onCompleteRide }: Props) => {
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] =
    useLazyGetBookingByidQuery();

  useEffect(() => {
    console.log('userId', userId);
    triggerGetBookings({ driverId: userId, status: 'ACTIVE' });
  }, []);

  return (
    <div>
      {isBookingsLoading && <CircularProgress />}
      {bookingData ? (
        bookingData.map((booking, index) => (
          <UserRideCrd
            key={index}
            data={booking}
            driver={true}
            onCompleteRide={() => {
              triggerGetBookings({ driverId: userId, status: 'ACTIVE' });
              onCompleteRide(booking);
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

export default AcceptedRides;
