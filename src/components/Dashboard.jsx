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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M27.6 25.8L22 20.2C23.3 18.5 24.1 16.4 24.1 14.1C24.1 8.59998 19.6 4.09998 14.1 4.09998C8.6 4.09998 4 8.59998 4 14.1C4 19.6 8.5 24.1 14 24.1C16.3 24.1 18.5 23.3 20.2 21.9L25.8 27.5C26 27.7 26.4 27.9 26.7 27.9C27 27.9 27.3 27.8 27.6 27.5C28.1 27.1 28.1 26.3 27.6 25.8ZM6.5 14.1C6.5 9.99998 9.9 6.59998 14 6.59998C18.1 6.59998 21.5 9.99998 21.5 14.1C21.5 18.2 18.1 21.6 14 21.6C9.9 21.6 6.5 18.3 6.5 14.1Z" fill="#4D44B5" />
              </svg>
            </button>
            <input class="input" type="search" placeholder="Search here..." />

          </div>
          <div className="controls">
            <div className="notify">
              <img src=" https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281722/bell_muudfk.svg " />
            </div>
            <div className="setting">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M12.2629 2.66669L11.4166 6.46617C10.9352 6.6978 10.4751 6.9646 10.0338 7.26565L6.32023 6.09637L2.58325 12.5703L5.39836 15.1485C5.28837 15.9648 5.33819 16.3672 5.39836 16.8516L2.58325 19.4297L6.32023 25.9037L10.0338 24.7344C10.4751 25.0354 10.9352 25.3022 11.4166 25.5339L12.2629 29.3334H19.7369L20.5833 25.5339C21.0646 25.3022 21.5248 25.0354 21.9661 24.7344L25.6796 25.9037L29.4166 19.4297L26.6015 16.8516C26.6245 16.5682 26.6663 16.2846 26.6666 16C26.6677 15.7069 26.6215 15.4108 26.6015 15.1485L29.4166 12.5703L25.6796 6.09637L21.9661 7.26565C21.5248 6.9646 21.0646 6.6978 20.5833 6.46617L19.7369 2.66669H12.2629ZM14.4036 5.33335H17.5963L18.2551 8.29169L18.9166 8.5521C19.6648 8.84513 20.3643 9.24847 20.9921 9.75002L21.5494 10.1927L24.44 9.28387L26.0364 12.0495L23.802 14.099L23.9088 14.8021C24.0344 15.5797 24.01 16.4746 23.9088 17.1979L23.802 17.9011L26.0364 19.9505L24.44 22.7162L21.5494 21.8073L20.9921 22.25C20.3643 22.7516 19.6648 23.1549 18.9166 23.4479L18.2551 23.7084L17.5963 26.6667H14.4036L13.7447 23.7084L13.0833 23.4479C12.335 23.1549 11.6356 22.7516 11.0077 22.25L10.4504 21.8073L7.55981 22.7162L5.96346 19.9505L8.19783 17.9011L8.09106 17.1979C7.96083 16.4047 7.98083 15.4967 8.09106 14.8021L8.19783 14.099L5.96346 12.0495L7.55981 9.28387L10.4504 10.1927L11.0077 9.75002C11.6356 9.24847 12.335 8.84513 13.0833 8.5521L13.7447 8.29169L14.4036 5.33335ZM15.9999 10.6667C13.0702 10.6667 10.6666 13.0703 10.6666 16C10.6666 18.9297 13.0702 21.3334 15.9999 21.3334C18.9296 21.3334 21.3333 18.9297 21.3333 16C21.3333 13.0703 18.9296 10.6667 15.9999 10.6667ZM15.9999 13.3334C17.4885 13.3334 18.6666 14.5115 18.6666 16C18.6666 17.4886 17.4885 18.6667 15.9999 18.6667C14.5114 18.6667 13.3333 17.4886 13.3333 16C13.3333 14.5115 14.5114 13.3334 15.9999 13.3334Z" fill="#A098AE" />
              </svg>
            </div>
            <div className="user">
              <h1>Joshua N.</h1>
              <p>Admin</p>
            </div>
            <div className="user-pics">
            </div>
          </div>
        </nav>
        <div className="counter">
        <div className="count">
        <div className="count1">
            <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281721/Student_hunumx.svg" />
            <div className="text">
            <p>Students</p>
            <h2>932k</h2>
            </div>
          </div>
          <div className="count2">
            <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281721/Student_hunumx.svg" alt="" />
            <div className="text">
            <p>Teachers</p>
            <h2>754k</h2>
            </div>
          </div>
          <div className="count3">
            <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/Calendar_y5hl1n.svg" alt="" />
            <div className="text">
            <p>Events</p>
            <h2>40K</h2>
            </div>
          </div>
          <div className="count4">
            <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281721/food_cp4exu.svg" alt="" />
            <div className="text">
            <p>Foods</p>
            <h2>32k</h2>
            </div>
          </div>
        </div>
        </div>
        <div className="tables">
          <div className="calendar-container">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border no-background"
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
              <div className="notify"></div>
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
