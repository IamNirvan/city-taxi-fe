import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
import './index.scss';
import { Roles } from '../../const';
import SignIn from './login';
import GooglePlacesAutocomplete from '../../components/locationSearch';

export default function AdminLoginPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const locationResults = (data : any)=>{
    console.log('locationResults data', data)
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1', }} className="login-wrapper">
      <CardContent sx={{width: '500px'}}>
        <Card variant='outlined' className='login-card' sx={{padding: '20px'}}>
          <GooglePlacesAutocomplete  results={locationResults}/>
          <SignIn loginType={Roles.ADMIN}/>
        </Card>
      </CardContent>
    </Box>
  );
}