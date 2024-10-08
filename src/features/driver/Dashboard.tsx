import {
  AlertColor,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import './index.scss';
import TaxiDialog from '../../components/Dialog/TaxtDialog';
import React, { useEffect, useState } from 'react';
import {
  useAddVehicleMutation,
  useLazyGetVehicleByidQuery,
  useUpdateVehicleMutation,
} from '../../api/vehicleApiSlice';
import DriverCard from '../../components/driverCard';
import { TCreateVehicle } from '../../types/vehicle';
import { accountType } from '../../const';
import { useNavigate } from 'react-router';
import LogoContainer from '../../components/logoContainer';
import TaxiAlert from '../../components/Alert';
import { TVehicle } from '../../types/driver';
import { useLazyGetDriverQuery } from '../../api/driverApiSlice';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [triggerAddVehicle, { isLoading }] = useAddVehicleMutation();
  const [triggerUpdateVehicle] = useUpdateVehicleMutation();
  const [triggerAddVehicleList, { isLoading: isVehicleLoading, data: vehicleList }] =
    useLazyGetDriverQuery();
  const navigate = useNavigate();

  const [modelError, setModelError] = React.useState(false);
  const [modelErrorMessage, setModelErrorMessage] = React.useState('');
  const [manufacturerError, setManufacturerError] = React.useState(false);
  const [manufacturerErrorMessage, setManufacturerErrorMessage] = React.useState('');
  const [colourError, setColourError] = React.useState(false);
  const [colourErrorMessage, setColourErrorMessage] = React.useState('');
  const [licensePlateError, setLicensePlateError] = React.useState(false);
  const [licensePlateErrorMessage, setLicensePlateErrorMessage] = React.useState('');
  const [vehicleTypeId, setVehicleTypeId] = useState(1);
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;
  const [message, setMessage] = React.useState<{ message: string; type: AlertColor } | null>(null);
  const [updatedVehicle, setUpdatedVehicle] = React.useState<TVehicle | undefined>(undefined);

  useEffect(() => {
    if (!accData) {
      navigate('/login');
    } else if (accData.accountType == accountType.driver) {
      triggerAddVehicleList(accData.userId);
    } else {
      localStorage.removeItem('account');
      navigate('/login');
    }
  }, []);

  const onUpdateVehicle = (data: TVehicle) => {
    setUpdatedVehicle(data);
    setOpenDialog(true);
    setVehicleTypeId(data.vehicleType.id);
  };

  const addVehicleToSystem = (data: TCreateVehicle) => {
    setMessage(null);
    if (updatedVehicle) {
      const updtedData = { ...data, id: updatedVehicle.id };
      triggerUpdateVehicle(updtedData)
        .unwrap()
        .then((res) => {
          triggerAddVehicleList(accData.userId);
          setMessage({ message: 'Successfuly updated Vehicle', type: 'success' });
        })
        .catch((err) => setMessage({ message: err?.data?.message, type: 'error' }));
    } else {
      triggerAddVehicle([data])
        .unwrap()
        .then((res) => {
          triggerAddVehicleList(accData.userId);
          setMessage({ message: 'Successfuly Add Vehicle', type: 'success' });
        })
        .catch((err) => setMessage({ message: err?.data?.message, type: 'error' }));
    }

    triggerAddVehicleList(accData.userId);
    setOpenDialog(false);
    setUpdatedVehicle(undefined);
  };
  const validateInputs = () => {
    const model = document.getElementById('model') as HTMLInputElement;
    const manufacturer = document.getElementById('manufacturer') as HTMLInputElement;
    const colour = document.getElementById('colour') as HTMLInputElement;
    const licensePlate = document.getElementById('licensePlate') as HTMLInputElement;

    let isValid = true;

    if (!model.value) {
      setModelError(true);
      setModelErrorMessage('add model please');
      isValid = false;
    } else {
      setModelError(false);
      setModelErrorMessage('');
    }
    if (!manufacturer.value) {
      setManufacturerError(true);
      setManufacturerErrorMessage('add manufacturer please');
      isValid = false;
    } else {
      setManufacturerError(false);
      setManufacturerErrorMessage('');
    }
    if (!colour.value) {
      setColourError(true);
      setColourErrorMessage('add color please');
      isValid = false;
    } else {
      setColourError(false);
      setColourErrorMessage('');
    }
    if (!licensePlate.value) {
      setLicensePlateError(true);
      setLicensePlateErrorMessage('add liecense plate please');
      isValid = false;
    } else {
      setLicensePlateError(false);
      setLicensePlateErrorMessage('');
    }

    if (isValid)
      addVehicleToSystem({
        colour: colour.value,
        driverId: accData.userId,
        licensePlate: licensePlate.value,
        manufacturer: manufacturer.value,
        model: model.value,
        vehicleTypeId: vehicleTypeId,
      });
  };

  const handleVehicleTypeChange = (event: any) => {
    setVehicleTypeId(event.target.value);
  };

  const addVehicle = () => {
    return (
      <>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            gap: 2,
            padding: '40px 20px',
          }}
        >
          <FormControl>
            <FormLabel className="sign-label" htmlFor="model">
              Vehicle Model
            </FormLabel>
            <TextField
              className="input-item"
              error={modelError}
              helperText={modelErrorMessage}
              id="model"
              type="model"
              name="model"
              placeholder="Aqua"
              autoComplete="model"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={modelError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'model' }}
              defaultValue={updatedVehicle?.model || ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="manufacturer">
              Manufacturer
            </FormLabel>
            <TextField
              className="input-item"
              error={manufacturerError}
              helperText={manufacturerErrorMessage}
              id="manufacturer"
              type="manufacturer"
              name="manufacturer"
              placeholder="Toyota"
              autoComplete="manufacturer"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={manufacturerError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'manufacturer' }}
              defaultValue={updatedVehicle?.manufacturer || ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="colour">
              Color
            </FormLabel>
            <TextField
              className="input-item"
              error={colourError}
              helperText={colourErrorMessage}
              id="colour"
              type="colour"
              name="colour"
              placeholder="red"
              autoComplete="colour"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={colourError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'color' }}
              defaultValue={updatedVehicle?.colour || ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="licensePlate">
              License plate
            </FormLabel>
            <TextField
              className="input-item"
              error={licensePlateError}
              helperText={licensePlateErrorMessage}
              id="licensePlate"
              type="licensePlate"
              name="licensePlate"
              placeholder="AB-7980"
              autoComplete="licensePlate"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={licensePlateError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'licensePlate' }}
              defaultValue={updatedVehicle?.licensePlate || ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="vehicleTypeId">
              Vehicle type
            </FormLabel>
            <Select
              labelId="vehicleTypeId"
              id="vehicleTypeId"
              value={vehicleTypeId}
              onChange={handleVehicleTypeChange}
              label=""
            >
              <MenuItem value={1}>Bike</MenuItem>
              <MenuItem value={2}>Car</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };

  const onCloseClick = () => {
    setMessage(null);
    setOpenDialog(false);
    setUpdatedVehicle(undefined);
  };

  return (
    <div>
      <h2 className="title-dash">Driver Dashboard</h2>
      {message && (
        <TaxiAlert
          text={message.message}
          severity={message.type}
          onClose={() => setMessage(null)}
        />
      )}
      <TaxiDialog
        open={openDialog}
        handleClose={onCloseClick}
        title={'add vehicle to system'}
        infoText={'You can add vehicle in here'}
        children={addVehicle()}
        handleContinue={() => validateInputs()}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="add-driver-container">
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Add vehicle
          </Button>
        </div>
        <div className="driver-body">
          <h3>My Vehicles List</h3>
          <div className="vehicle-container">
            {isVehicleLoading && <CircularProgress />}
            {vehicleList ? (
              vehicleList[0]?.vehicles?.map((vehicle: TVehicle, index: number) => (
                <DriverCard
                  key={index}
                  data={vehicle}
                  onUpdateVehicle={() => onUpdateVehicle(vehicle)}
                />
              ))
            ) : (
              <>
                <LogoContainer />
                <h3 className="no-vhicle">
                  You haven't added vehicles. Please add a vehicle to the system.
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
