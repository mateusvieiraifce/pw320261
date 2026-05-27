import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Box, TextField } from '@mui/material'
import './App.css'
import './Dash.css'
import { Link } from 'react-router'
import Menu from './Menu'
import User from './User'
import { useEffect } from 'react'
import Produtos from './Produtos'

import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February'],
  datasets: [{ label: 'Sales', data: [10, 20], backgroundColor: 'blue' }]
};

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // 'top', 'bottom', 'left', 'right'
    },
  },
};


function Dashboard() {
  const [pag, setPag] = useState("Dashboard")

  useEffect(() => {
    console.log("Dashboard")
  }, [])

  function renderContent() {
    if (pag === "Dashboard") {
      return (
        <div className='layout' style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1> DASHBOARD</h1>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center" }}>
            <Box sx={{ height: 280, width: '100%', border: '1px solid black', padding: 2, marginRight: 5 }}>
              <Bar data={data} />;
            </Box>
            <Box sx={{ height: 280, width: '100%', border: '1px solid black', padding: 2, marginRight: 5, alignItems: "center", display: "flex", justifyContent: "center" }}>
              <Pie data={pieData} options={options} id="pie-chart" />
            </Box>
          </div>
        </div>
      )
    }
    if (pag === "Users") {
      console.log("Users")
      return (<User />)
    }

    if (pag === "Produtos") {
      console.log("Produtos")
      return (<Produtos />)
    }
  }
  return (
    <>
      <div className='top' >
        <Menu page={pag} />
        {renderContent()}
      </div>

    </>
  )
}

export default Dashboard
