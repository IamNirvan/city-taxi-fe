import { TCreateCustomerRes } from './customer';
import { TDriverNearByRes } from './driver';

type TCreateBooking = {
  customerId: number;
  driverId: number;
  startLatitude: number;
  startLongitude: number;
  destLatitude: number;
  destLongitude: number;
};

type TBookingStatusCreate = {
  id: number;
  status: 'ACTIVE' | 'BUSY';
};

type VehicleType = {
  id: number;
  name: string;
  pricePerMeter: number;
  seatCount: number;
  createdAt: string;
  updatedAt: string;
};

type Vehicle = {
  id: number;
  manufacturer: string;
  model: string;
  colour: string;
  licensePlate: string;
  vehicleType: VehicleType;
  createdAt: string;
  updatedAt: string | null;
};

type TBookingRide = {
  id: number;
  estimatedCost: number;
  distanceInMeters: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'ACTIVE';
  driver: TDriverNearByRes;
  customer: TCreateCustomerRes;
  vehicle: Vehicle;
  createdAt: string | null;
  updatedAt: string;
};

type TGetBookingById = {
  id?: number;
  driverId?: number;
  customerId?: number;
  status?: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'ACTIVE' | 'DONE' | 'PAID';
};

type TRatingCreate = {
  bookingId: number;
  rating: number;
};

export type { TCreateBooking, TBookingStatusCreate, TBookingRide, TGetBookingById, TRatingCreate };
