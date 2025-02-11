import React, { Suspense, lazy,  } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './components/landingpage/index.jsx';
import {AuthProvider } from './components/layout/authcontext.js';
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
const AddDomain = lazy(() => import('./components/adddomain/index.jsx'));
const DomainDetails = lazy(() => import('./components/domaindetails/index.jsx'));
const DomainHistory = lazy(() => import('./components/domainhistory/index.jsx'));
const DomainReport = lazy(() => import('./components/domainreport/index.jsx'));
const AddCCTV = lazy(() => import('./components/addcctv/index.jsx'));
const CCTVDetails = lazy(() => import('./components/cctvdetails/index.jsx'));
const CctvHistory = lazy(() => import('./components/cctvhistory/index.jsx'));
const CCTVReport = lazy(() => import('./components/cctvreport/index.jsx'));
const AddPrinter = lazy(() => import('./components/addprinter/index.jsx'));
const PrinterDetails = lazy(() => import('./components/printerdetails/index.jsx'));
const PrinterHistory = lazy(() => import('./components/printerhistory/index.jsx'));
const PrinterReport = lazy(() => import('./components/printerreports/index.jsx'));
const AddDongle = lazy(() => import('./components/adddongle/index.jsx'));
const DongleDetails = lazy(() => import('./components/dongledetails/index.jsx'));
const DongleHistory = lazy(() => import('./components/donglehistory/index.jsx'));
const DongleReport = lazy(() => import('./components/donglereport/index.jsx'));
const AddProjector = lazy(() => import('./components/addprojector/index.jsx'));
const ProjectorDetails = lazy(() => import('./components/projectordetails/index.jsx'));
const ProjectorHistory = lazy(() => import('./components/projectorhistory/index.jsx'));
const ProjectorReport = lazy(() => import('./components/projectorreport/index.jsx'));
const AddTablet = lazy(() => import('./components/addtablet/index.jsx'));
const TabletDetails = lazy(() => import('./components/tabletdetails/index.jsx'));
const TabletHistory = lazy(() => import('./components/tablethistory/index.jsx'));
const TabletReport = lazy(() => import('./components/tabletreport/index.jsx'));
const AddPhone = lazy(() => import('./components/addphone/index.jsx'));
const PhoneDetails = lazy(() => import('./components/phonedetails/index.jsx'));
const PhoneHistory = lazy(() => import('./components/phonehistory/index.jsx'));
const PhoneReport = lazy(() => import('./components/phonereport/index.jsx'));
const AddRouter = lazy(() => import('./components/addrouter/index.jsx'));
const RouterDetails = lazy(() => import('./components/routerdetails/index.jsx'));
const RouterHistory = lazy(() => import('./components/routerhistory/index.jsx'));
const RouterReport = lazy(() => import('./components/routerreport/index.jsx'));
const AddSim = lazy (()=> import ('./components/addsim/index.jsx'));
// const SimDetails =lazy(()=>import('./components/simdetails/index.jsx'));
const SimHistory =lazy (()=>import('./components/simhistory/index.jsx'));
const SimCardDetails =lazy(()=>import('./components/simdetails/index.jsx'));
const SimReport =lazy (()=>import('./components/simreport/index.jsx'));
const Unauthorized = lazy(() => import('./components/unauthorized/index.jsx'));
const NotFound = lazy(() => import('./components/notfound/index.jsx'));

function App() {
  

  // Check if the current route is allowed
  
  return (
    <Router>
     <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/signup" element={<AdminSignup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
    
            <Route element={<ProtectedRoute allowedRoles={["admin"]}  />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
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
              <Route path="/add-domain" element={<AddDomain />} />
              <Route path="/domain-details" element={<DomainDetails />} />
              <Route path="/domain-history" element={<DomainHistory />} />
              <Route path="/domain-report" element={<DomainReport />} />
              <Route path="/add-cctv" element={<AddCCTV />} />
              <Route path="/cctv-details" element={<CCTVDetails />} />
              <Route path="/cctv-history" element={<CctvHistory />} />
              <Route path="/cctv-report" element={<CCTVReport />} />
              <Route path="/add-printer" element={<AddPrinter />} />
              <Route path="/printer-details" element={<PrinterDetails />} />
              <Route path="/printer-history" element={<PrinterHistory />} />
              <Route path="/printer-report" element={<PrinterReport />} />
              <Route path="/add-router" element={<AddRouter />} />
              <Route path="/add-dongle" element={<AddDongle />} />
              <Route path="/dongle-details" element={<DongleDetails />} />
              <Route path="/dongle-history" element={<DongleHistory />} />
              <Route path="/dongle-report" element={<DongleReport />} />
              <Route path="/Add-projector" element={<AddProjector/>}/>
              <Route path="/projector-details" element={<ProjectorDetails/>}/>
              <Route path="/projector-history" element={<ProjectorHistory/>}/>
              <Route path="/projector-report" element={<ProjectorReport/>}/>
              <Route path="/add-tablet" element={<AddTablet/>}/>
              <Route path="/tablet-details" element={<TabletDetails/>}/>
              <Route path="/tablet-history" element={<TabletHistory/>}/>
              <Route path ="/tablet-report" element={<TabletReport/>}/>
              <Route path="/add-phone" element={<AddPhone />} />
              <Route path="/phone-details" element={<PhoneDetails />} />
              <Route path="/phone-history" element={<PhoneHistory />} />
              <Route path="/phone-report" element={<PhoneReport />} />
              <Route path="/add-router" element={<AddRouter />} />
              <Route path="/router-details" element={<RouterDetails />} />
               <Route path="/router-history" element={<RouterHistory />} />
              <Route path="/router-report" element={<RouterReport />} /> 
              <Route path="/add-sim-card" element={<AddSim/>}/>
              <Route path="/sim-card-details" element={<SimCardDetails />}/>
              <Route path="/sim-card-history" element={<SimHistory/>}/>
              <Route path="/sim-card-report" element={<SimReport/>}/>
            </Route>

            {/* HR-Specific Routes */}
            <Route element={<ProtectedRoute allowedRoles={["hr"]}  />}>
              <Route path="/hr/dashboard" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/employee-details" element={<EmployeeDetails />} />
              <Route path="/employee-report" element={<EmployeeReport />} />
              <Route path="/add-dongle" element={<AddDongle />} />
              <Route path="/dongle-details" element={<DongleDetails />} />
              <Route path="/dongle-history" element={<DongleHistory />} />
              <Route path="/dongle-report" element={<DongleReport />} />
              <Route path="/add-phone" element={<AddPhone />} />
              <Route path="/phone-details" element={<PhoneDetails />} />
              <Route path="/phone-history" element={<PhoneHistory />} />
              <Route path="/phone-report" element={<PhoneReport />} />
            </Route>

            {/* User-Specific Routes */}
            <Route element={<ProtectedRoute allowedRoles={["other"]}  />}>
              <Route path="/other/dashboard" element={<Dashboard />} />
              <Route path="/laptop-details" element={<LaptopDetails />} />
              <Route path="/desktop-details" element={<DesktopDetails />} />
              <Route path="/cctv-details" element={<CCTVDetails />} />
              <Route path="/printer-details" element={<PrinterDetails />} />
              <Route path="/dongle-details" element={<DongleDetails />} />
              <Route path="/phone-details" element={<PhoneDetails />} />
              <Route path="/router-history" element={<RouterHistory />} />
            </Route>

            {/* Not Found Route */}
           
            <Route path="*" element={<NotFound />} />
           
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-right" autoClose={2000} />
     </AuthProvider>
    </Router>
  );
}

export default App;
