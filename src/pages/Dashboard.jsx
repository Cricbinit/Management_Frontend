import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({ completed: 0, pending: 0, latestTasks: [] });

  const token = localStorage.getItem('token');

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://44.203.69.173:5000/api/tasks/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
        console.log(err);
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl">Completed Tasks</h2>
          <p className="text-3xl">{data.completed}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl">Pending Tasks</h2>
          <p className="text-3xl">{data.pending}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl">Latest Tasks</h2>
          {data.latestTasks.map((task) => (
            <div key={task._id} className="text-sm">
              - {task.title} ({task.status})
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/tasks"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Manage Tasks
      </Link>
    </div>
  );
}

export default Dashboard;
