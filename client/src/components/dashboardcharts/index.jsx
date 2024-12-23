import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';



Chart.register(...registerables);


export default function DashboardCharts() {
    const [laptopDivisionCount, setLaptopDivisionCount] = useState({});
  const [desktopDivisionCount, setDesktopDivisionCount] = useState({});


  const fetchLaptopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        const laptops = response.data.laptops || response.data;

        const divisionCount = laptops.reduce((acc, laptop) => {
          const division = laptop.assignedTo?.division || 'Unknown Division';
          acc[division] = (acc[division] || 0) + 1;
          return acc;
        }, {});

        setLaptopDivisionCount(divisionCount);
      } else {
        console.error('Error fetching laptops:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching laptops:', error.message);
    }
  };

  const fetchDesktopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
        const desktops = response.data.desktops || response.data;

        const divisionCount = desktops.reduce((acc, desktop) => {
          const division = desktop.assignedTo?.division || 'Unknown Division';
          acc[division] = (acc[division] || 0) + 1;
          return acc;
        }, {});

        setDesktopDivisionCount(divisionCount);
      } else {
        console.error('Error fetching desktops:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching desktops:', error.message);
    }
  };

  useEffect(() => {
    fetchLaptopData();
    fetchDesktopData();
  }, []);



  const createChartData = (data) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    return {
      labels,
      datasets: [{
        label: 'Count',
        data: values,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      }],
    };
  };



  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        
        <div className="card rounded-box grid h-32 flex-grow font-bold place-items-center"  style={{ color: "#FF735C" }}>
          Laptop Division Wise
        </div>
  
        <div className="card rounded-box grid h-32 flex-grow place-items-center">
          <div className="card rounded-box flex flex-col items-start">
            <Doughnut
              data={createChartData(laptopDivisionCount)}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={300}
            />
          </div>
        </div>
  
      
        <div className="divider lg:divider-horizontal py-4">OR</div>
  
        <div className="card rounded-box grid h-32 flex-grow font-bold place-items-center md:py-16 sm:py-2 py-2"  style={{ color: "#FF735C" }}>
          Desktop Division Wise
        </div>
  
        <div className="card rounded-box flex flex-col items-end">
          <Pie
            data={createChartData(desktopDivisionCount)}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={300}
          />
        </div>
      </div>
    </div>
  </div>
  
  )
}
