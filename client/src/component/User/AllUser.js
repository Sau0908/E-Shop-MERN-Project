import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://e-shop-mern-project.vercel.app/api/user");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-4 text-red-500">Error loading users</div>
    );

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <LeftNav />
        <div className="flex-1 p-6 flex flex-wrap gap-4 justify-center">
          {users &&
            users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center w-60 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl uppercase">
                  {user.username ? user.username.charAt(0) : "U"}
                </div>
                <p className="mt-2 text-lg text-center font-semibold text-gray-800">
                  {user.username ? user.username : "Unknown User"}
                </p>
                <p className="mt-1 text-sm text-center text-gray-600">
                  {user.email ? user.email : "No Email"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllUser;
