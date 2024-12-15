import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function Homepage() {
  const [userStats, setUserStats] = useState([]);
  const [listingStats, setListingStats] = useState([]);

  useEffect(() => {
    // Hàm lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        // Lấy dữ liệu người dùng
        const userRes = await fetch("/api/admin/users/stats");
        const userData = await userRes.json();
        setUserStats(userData);

        // Lấy dữ liệu danh sách
        const listingRes = await fetch("/api/admin/listings/stats");
        const listingData = await listingRes.json();
        setListingStats(listingData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  // Xử lý dữ liệu thành dạng phù hợp cho biểu đồ
  const processData = (data) => {
    const labels = data.map((item) => item._id); // Ngày tháng
    const counts = data.map((item) => item.count); // Số lượng
    return { labels, counts };
  };

  const userData = processData(userStats);
  const listingData = processData(listingStats);

  // Cấu hình dữ liệu cho Line Chart
  const chartData = {
    labels: userData.labels, // Dùng nhãn ngày từ userData
    datasets: [
      {
        label: "Users Created",
        data: userData.counts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Listings Created",
        data: listingData.counts,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Statistics",
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <h2 className="text-center text-xl font-bold mb-4">User and Listing Statistics</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}
