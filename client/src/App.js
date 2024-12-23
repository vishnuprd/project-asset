import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/layout/authcontext.js';
import ProtectedRoute from './components/layout/protected-route.js';


const AdminLogin = lazy(() => import('./components/adminlogin/index.jsx'));
const AdminSignup = lazy(() => import('./components/adminsignup/index.jsx'));
const Dashboard = lazy(() => import('./components/dashboard/index.jsx'));
const AddEmployee = lazy(() => import('./components/addemployee/index.jsx'));
const EmployeeDetails = lazy(() => import('./components/employeedetails/index.jsx'));
const EmployeeReport = lazy(() => import('./components/employeereport/index.jsx'));
const AddLaptop = lazy(() => import('./components/addlaptop/index.jsx'));
const LaptopDetails = lazy(() => import('./components/laptopdetails/index.jsx'));
const LaptopHistory = lazy(() => import('./components/laptophistory/index.jsx'));
const LaptopReport = lazy(() => import('./components/laptopreport/index.jsx'));
const AddDesktop = lazy(() => import('./components/adddesktop/index.jsx'));
const DesktopDetails = lazy(() => import('./components/desktopdetails/index.jsx'));
const DesktopHistory = lazy(() => import('./components/desktophistory/index.jsx'));
const DesktopReport = lazy(() => import('./components/desktopreport/index.jsx'));
const AddScrap = lazy(() => import('./components/addscrap/index.jsx'));
const ScrapHistory = lazy(() => import('./components/scraphistory/index.jsx'));
const ScrapReport = lazy(() => import('./components/scrapreport/index.jsx'));
const NotFound = lazy(() => import('./components/notfound/index.jsx'));

function App() {
  return (
   
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
           
            <Route path="/" element={<AdminLogin />} />
            <Route path="/signup" element={<AdminSignup />} />

      
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/employee-details" element={<EmployeeDetails />} />
              <Route path="/employee-report" element={<EmployeeReport />} />
              <Route path="/assets-laptop" element={<AddLaptop />} />
              <Route path="/laptop-details" element={<LaptopDetails />} />
              <Route path="/assets-laptop-history" element={<LaptopHistory />} />
              <Route path="/laptop-report" element={<LaptopReport />} />
              <Route path="/assets-desktop" element={<AddDesktop />} />
              <Route path="/desktop-details" element={<DesktopDetails />} />
              <Route path="/assets/desktop-history" element={<DesktopHistory />} />
              <Route path="/desktop-report" element={<DesktopReport />} />
              <Route path="/scrap-items" element={<AddScrap />} />
              <Route path="/scrap-history" element={<ScrapHistory />} />
              <Route path="/scrap-report" element={<ScrapReport />} />
            </Route>

          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
