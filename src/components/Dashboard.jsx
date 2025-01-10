import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../assets/style/dashboard.css";

const Dashboard = () => {
  const [date, setDate] = React.useState(new Date());

  const chartData = [
    { day: "Mon", red: 220, yellow: 270 },
    { day: "Tue", red: 170, yellow: 120 },
    { day: "Wed", red: 90, yellow: 100 },
    { day: "Thu", red: 120, yellow: 170 },
    { day: "Fri", red: 70, yellow: 90 },
    { day: "Sat", red: 250, yellow: 220 },
    { day: "Sun", red: 210, yellow: 270 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>{label}</p>
          <p>Red Bar: {payload[0].value}</p>
          <p>Yellow Bar: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      
      <div className="sidebar">

      </div>
      <div className="sidebar2">
        <nav>
          <div className="dash">
            <h2>Dashboard</h2>
          </div>
          <div class="search">
            <button class="search-btn" type="submit">
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <input class="input" type="search" placeholder="Search" />
            
          </div>
            
        </nav>
        
        <div className="tables">
          <div className="calendar-container">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border no-background"
              style={{
                width: "800px !imporant", // Makes the calendar wider
                maxWidth: "800px", // Limits the maximum width for responsive design
                margin: "0px", // Centers the calendar
                backgroundColor: "transparent", // Removes background
                boxShadow: "none", // Removes shadow
                border: "none", // Removes the border
              }}
            />
          </div>
          <div className="chart-container mt-6">
            <BarChart
              width={400}
              height={320}
              data={chartData}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              padding={{ left: 50 }}
              barCategoryGap="20%"
              barGap={7}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="red" fill="#FB7D5B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="yellow" fill="#FCC43E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
