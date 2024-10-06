import { AlertColor, Button, Card, CardContent } from '@mui/material';
import { TaxiBike, TaxiCar } from '../../assets/img';
import { bookingStatus, VehicleType } from '../../const';
import './index.scss';
import { TBookingRide } from '../../types/booking';

interface TaxiCardProps {
  data: TBookingRide;
  driver?: boolean;
  oReviewRide?: () => void;
  onPayRide?: () => void;
  onCompleteRide?: () => void;
}
export default function UserRideCrd({
  data,
  oReviewRide,
  onPayRide,
  driver,
  onCompleteRide,
}: TaxiCardProps) {
  console.log('data', data);
  console.log(`driver = ${driver}`);

  return (
    <CardContent sx={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
      <Card variant="outlined" className="login-card">
        <div className="taxt-card-wrapper">
          <div className="taxt-card-img">
            {data.vehicle.vehicleType.name == 'Motorcycle' ? (
              <img src={TaxiBike} />
            ) : (
              <img src={TaxiCar} />
            )}
          </div>
          <div className="taxt-card-content">
            <div className="title">
              {data.vehicle.manufacturer} {data.vehicle.model}
            </div>
            <div className="detail">Per km : {data.vehicle.vehicleType.pricePerMeter}Rs</div>
            <div className="detail">Passenger Count : {data.vehicle.vehicleType.seatCount}</div>
            <div className="detail">Vehicle Number: {data.vehicle.licensePlate}</div>
            <div className="detail">
              Distance: {data.distanceInMeters ? data.distanceInMeters / 1000 : 0} Km
            </div>
            <div className="detail">Status: {data.status}</div>
            <div className="detail">start Destination: Galle</div>
            <div className="detail">end Destination: Matara</div>
            <div className="detail">Full Payment: {data.estimatedCost}Rs </div>
            <div className="detail">Driver Name: {data.driver.name} </div>
            <div className="detail">Customer Name: {data.customer.name} </div>
            <div className="detail">Driver Number: {data.driver.phoneNumber} </div>

            <div className="button">
              {data.status == bookingStatus.paid && (
                <Button
                  sx={{ marginTop: '8px' }}
                  color="success"
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={oReviewRide}
                >
                  Review
                </Button>
              )}
              {data.status == bookingStatus.completed && (
                <Button
                  sx={{ marginTop: '8px' }}
                  color="success"
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={onPayRide}
                >
                  Pay
                </Button>
              )}
              {data.status == bookingStatus.active && driver && (
                <Button
                  sx={{ marginTop: '8px' }}
                  color="success"
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={onCompleteRide}
                >
                  Complete Ride
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </CardContent>
  );
}
