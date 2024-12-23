import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function LocationChart() {
  const [laptopLocationCount, setLaptopLocationCount] = useState({});
  const [desktopLocationCount, setDesktopLocationCount] = useState({});

  
  const fetchLaptopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        const laptops = response.data.laptops || response.data;

        const locationCount = laptops.reduce((acc, laptop) => {
          const location = laptop.assignedTo?.location || 'Unknown Location';
          acc[location] = (acc[location] || 0) + 1;
          return acc;
        }, {});

        setLaptopLocationCount(locationCount);
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

        const locationCount = desktops.reduce((acc, desktop) => {
          const location = desktop.assignedTo?.location || 'Unknown Location';
          acc[location] = (acc[location] || 0) + 1;
          return acc;
        }, {});

        setDesktopLocationCount(locationCount);
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

 
  const combinedLabels = [...new Set([...Object.keys(laptopLocationCount), ...Object.keys(desktopLocationCount)])];


  const laptopData = combinedLabels.map(label => laptopLocationCount[label] || 0);
  const desktopData = combinedLabels.map(label => desktopLocationCount[label] || 0);


  const chartData = {
    labels: combinedLabels,
    datasets: [
      {
        label: 'Laptops',
        data: laptopData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverOffset: 4,
      },
      {
        label: 'Desktops',
        data: desktopData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center h-28 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-extrabold tracking-tight text-center "  style={{ color: "#FF735C" }}>Laptop and Desktop Locations</h2>
        </div>
      
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}