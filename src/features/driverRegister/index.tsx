import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AlertColor, Card, CardContent, CircularProgress, FormControl, FormLabel, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import LogoContainer from '../../components/logoContainer';
import styled from '@emotion/styled';
import { useRegisterMutation } from '../../api/driverApiSlice';
import { TCreateDriver } from '../../types/driver';
import GeocodingAutocomplete from '../../components/locationSearch';
import { TLocationData } from '../../types/geoLocation';
import TaxiAlert from '../../components/Alert';
import './index.scss';


const SignInContainer = styled(Stack)(({ theme }) => ({
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
    },
}));


export default function DriverSignInPage() {
    const navigate = useNavigate();
    const [triggerRegister, { isLoading }] = useRegisterMutation();

    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [phoneNumberError, setPhoneNumberError] = React.useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
    const [locationError, setLocationError] = React.useState(false);
    const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);
    const [locationData, setLocationData] = React.useState<TLocationData | undefined>(undefined)

    const onBackClick = () => {
        navigate('/login');
    };

    const handleRegister = async (data: TCreateDriver) => {
        setMessage(null);
        triggerRegister(data)
            .unwrap()
            .then(res => { setMessage({ message: 'Successfuly registered driver please check your email to login', type: 'success' }) })
            .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    };

    const validateInputs = () => {

        const firstName = document.getElementById('firstName') as HTMLInputElement;
        const driverLicense = document.getElementById('driverLicense') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;

        let isValid = true;

        if (!firstName.value) {
            setFirstNameError(true);
            setFirstNameErrorMessage('Please enter first name');
            isValid = false;
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }
        if (!driverLicense.value || !/^[A-Za-z]\d{7}$/.test(driverLicense.value)) {
            setLastNameError(true);
            setLastNameErrorMessage('Please enter a valid Driver License (1 letter followed by 7 digits)');
            isValid = false;
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        } 
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        if (!phoneNumber.value || !/^\+94\d{9}$/.test(phoneNumber.value)) {
            setPhoneNumberErrorMessage('Please enter a valid phone number.');
            isValid = false;
        } else {
            setPhoneNumberError(false);
            setPhoneNumberErrorMessage('');
        }
        
        if (!locationData || !locationData?.address) {
            setLocationError(true);
        } else {
            setLocationError(false);
        }

        if (isValid && locationData?.address) handleRegister({ name: firstName.value, email: email.value, phoneNumber: phoneNumber.value, driverLicense: driverLicense.value, latitude: locationData.lat , longitude: locationData.lng, locationName: locationData.address });
    };


    return (
        <SignInContainer>
            {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
            <Box sx={{ width: '100%', typography: 'body1' }} className={'login-wrapper'}>
                <CardContent sx={{ width: '800px' }}>
                    <Card variant='outlined' className='login-card'>
                        <Box sx={{ padding: '20px 20px 0px 20px' }}>
                            <LogoContainer />
                        </Box>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', padding: "0px 0 0 20px", textAlign: 'start' }}
                        >
                            Driver Sign Up
                        </Typography>
                        <Box component="form"
                            // onSubmit={handleSubmit}
                            noValidate
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 2,
                                padding: '40px 20px'
                            }} >
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="firstName">First Name</FormLabel>
                                <TextField
                                    className="input-item"
                                    error={firstNameError}
                                    helperText={firstNameErrorMessage}
                                    id="firstName"
                                    type="firstName"
                                    name="firstName"
                                    placeholder="Name"
                                    autoComplete="firstName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={firstNameError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'firstName' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="lastName">Driver License</FormLabel>
                                <TextField
                                    className="input-item"
                                    error={lastNameError}
                                    helperText={lastNameErrorMessage}
                                    id="driverLicense"
                                    type="driverLicense"
                                    name="driverLicense"
                                    placeholder="Driver License"
                                    autoComplete="driverLicense"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={lastNameError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'lastName' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="email">Email</FormLabel>
                                <TextField
                                    className="input-item"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="phoneNumber">Phone Number</FormLabel>
                                <TextField
                                    className="input-item"
                                    error={phoneNumberError}
                                    helperText={phoneNumberErrorMessage}
                                    id="phoneNumber"
                                    type="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="+94123456789"
                                    autoComplete="phoneNumber"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={phoneNumberError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'phonenumber' }}
                                />
                            </FormControl>
                            <FormControl>
                                <GeocodingAutocomplete results={(data) => setLocationData(data)} />
                                {locationError && <p className="location-error" id="email-helper-text">Please select location.</p>}
                            </FormControl>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={validateInputs}
                            >
                                {isLoading ? <CircularProgress /> : 'Sign in'}
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={onBackClick}
                            >
                                Back
                            </Button>
                        </Box>
                    </Card>
                </CardContent>
            </Box>
        </SignInContainer>
    );
}