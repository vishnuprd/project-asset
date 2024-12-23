import React from 'react'
import Sidebar from "../sidebar/index.jsx";
import Stats from "../stats/index.jsx";
import DashboardLaptopTable from '../dashboardlaptable/index.jsx';
import DashboardCharts from '../dashboardcharts/index.jsx';
import DashboardGeoCharts from '../dashboardgeocharts/index.jsx';
export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Stats />
      <DashboardLaptopTable />
      <DashboardCharts />
      <DashboardGeoCharts />
    </div>
  )
}
