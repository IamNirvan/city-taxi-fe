import AdminRoutes from './features/admin/Routes';
import DriverRoutes from './features/driver/Routes';
import OperatorRoutes from './features/operator/Routes';
import UserRoutes from './features/user/Routes';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import DriverSignInPage from './features/driverRegister';
import LoginPage from './features/login';
import UserSignInPage from './features/customerRegister';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import OperatorLoginPage from './features/operatorLogin';
import AdminLoginPage from './features/adminLogin';

const Home = lazy(() => import('./features/home/Home'));
const About = lazy(() => import('./features/help/Help'));

export default function AppRoutes() {
  return useRoutes([
    {
      element: <Home />,
      path: '/',
    },
    {
      element: <OperatorLoginPage />,
      path: '/operatorLogin',
    },
    {
      element: <AdminLoginPage />,
      path: '/adminLogin',
    },
    {
      element: <LoginPage />,
      path: '/login',
    },
    {
      element: <UserSignInPage />,
      path: '/userSignin',
    },
    {
      element: <DriverSignInPage />,
      path: '/driverSignIn',
    },
    UserRoutes,
    DriverRoutes,
    AdminRoutes,
    OperatorRoutes,
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
      ],
    },
  ]);
}
