import { useTranslation } from 'react-i18next';
import './index.scss';
import UserRideCrd from '../../components/userRideCard';
import {
  AlertColor,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Rating,
} from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useEffect, useState } from 'react';
import { Value } from 'sass';
import LogoContainer from '../../components/logoContainer';
import { useLazyGetBookingByidQuery, usePayBookingMutation } from '../../api/bookingApiSlice';
import { useAddReviewMutation } from '../../api/reviewApiSlice';
import PaymentMethod from '../../components/paymentMethod/PaymentMethod';
import TCreatePayment from '../../types/payment';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import OngoingRides from './tabs/OngoingRides';
import PendingPayments from './tabs/PendingPayments';
import PendingReviews from './tabs/PendingReviews';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [openPay, setOpenPay] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<number>(0);
  const [message, setMessage] = useState<{ message: string; type: AlertColor } | null>(null);
  const [value, setValue] = useState<number | null>(2);
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] =
    useLazyGetBookingByidQuery();
  const [triggerCreateRview] = useAddReviewMutation();
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;
  const [triggerPayBooking, { isLoading }] = usePayBookingMutation();
  const [selectedPayment, setSelectedPayment] = useState<any>();

  useEffect(() => {
    console.log('acc', JSON.stringify(accData));
    triggerGetBookings({ customerId: accData.uderId });
  }, []);

  const handleReview = () => {
    triggerCreateRview({ bookingId: bookingId, rating: value ?? 0 })
      .unwrap()
      .then((res) => {
        setMessage({ message: 'sucessfully reviewed', type: 'success' });
        setOpen(false);
      })
      .catch((err) => setMessage({ message: err?.data?.message, type: 'error' }));
  };
  const handlePayment = async (data: TCreatePayment) => {
    setMessage(null);
    triggerPayBooking(data)
      .unwrap()
      .then((res) => {
        setMessage({ message: 'sucessfully pay the amount', type: 'success' });
      })
      .catch((err) => setMessage({ message: err?.data?.message, type: 'error' }));
    setOpenPay(false);
    triggerGetBookings({ customerId: accData.uderId });
  };

  const onPayRide = (data: any) => {
    setSelectedPayment(data);
    console.log('onPayRide data ', data);
    setOpenPay(true);
  };

  const oReviewRide = (data: any) => {
    setBookingId(data.id);
    setOpen(true);
  };

  const onSuccess = (booking: any) => {
    if (selectedPayment) {
      handlePayment({ cost: selectedPayment?.estimatedCost, bookingId: selectedPayment?.id });
    }
  };
  const onDismissed = () => console.log('onDismissed');
  const onError = (error: any) => console.log('onError', error);

  return (
    <div className="user-view">
      {message && (
        <TaxiAlert
          text={message.message}
          severity={message.type}
          onClose={() => setMessage(null)}
        />
      )}
      <h2 className="title-dash">User Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Dialog open={open}>
          <DialogTitle>Review Ride</DialogTitle>
          <DialogContentText sx={{ padding: '0 20px' }}>
            In here here you can review the ride
          </DialogContentText>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}>
            <Rating
              className="rating-card"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="button" onClick={handleReview}>
              Review
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPay}>
          <DialogTitle>Book A Ride</DialogTitle>
          <DialogContentText sx={{ padding: '0 20px' }}>
            Select A start And end destinations to book a ride
          </DialogContentText>
          <DialogContent>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => setOpenPay(false)}>Cancel</Button>
            {/* {selectedPayment && (
              <PaymentMethod
                amount={Number(selectedPayment?.estimatedCost)}
                items={selectedPayment?.id}
                firstName={selectedPayment?.customer?.name?.split(' ')[0]}
                lastName={selectedPayment?.customer?.name?.split(' ')[1]}
                email={selectedPayment?.customer?.email}
                phone={selectedPayment?.customer?.phoneNumber}
                address="CityTaxi Head Office, 309 High Level Rd, Nugegoda 00600"
                delivery_address=""
                delivery_city=""
                delivery_country=""
                onSucess={onSuccess}
                onDismissed={onDismissed}
                onError={onError}
              />
            )} */}
            <Button variant="contained" type="button" onClick={onSuccess}>
              Pay
            </Button>
          </DialogActions>
        </Dialog>
        <div className="ride-body">
          <Tabs>
            <TabList>
              <Tab>Ongoing Rides</Tab>
              <Tab>Pending Payments</Tab>
              <Tab>Pending Reviews</Tab>
            </TabList>
            <TabPanel>
              <OngoingRides
                userId={accData.userId}
                onPayRide={onPayRide}
                oReviewRide={oReviewRide}
              />
            </TabPanel>
            <TabPanel>
              <PendingPayments
                userId={accData.userId}
                onPayRide={onPayRide}
                oReviewRide={oReviewRide}
              />
            </TabPanel>
            <TabPanel>
              <PendingReviews
                userId={accData.userId}
                onPayRide={onPayRide}
                oReviewRide={oReviewRide}
              />
            </TabPanel>
          </Tabs>
          {/* {isBookingsLoading && <CircularProgress />}
          {bookingData ? (
            bookingData.map((booking, index) => (
              <UserRideCrd
                key={index}
                data={booking}
                oReviewRide={() => oReviewRide(booking)}
                onPayRide={() => onPayRide(booking)}
              />
            ))
          ) : (
            <div className="no-data">
              {' '}
              <LogoContainer />
              <h3 className="no-vhicle">You have no rides yet.</h3>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
