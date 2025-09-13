import React, { useEffect, useState } from "react";
import DriverPanel from "../components/driver/DriverPanel";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function DriverPage() {
  const { user, logout } = useAuth();
  const [assignedBus, setAssignedBus] = useState(null);
  console.log(user.id);

   useEffect(() => {
      const fetchAssignedBus = async () => {
        if (!user?.id) return;
        console.log("ankit");

        try {
          const res = await API.get(`/official/drivers/${user.id}/bus`);
          setAssignedBus(res.data);
          console.log("Assigned Bus:", res.data);
        } catch (err) {
          console.error("Error fetching assigned bus:", err);
        }
      };

      if (user?.role === "driver") fetchAssignedBus();
    }, [user]);



  return (
    <>
    <div>
      
      {/* Logout Button */}
      <div className="w-full flex justify-between items-start mb-6">
          {/* Route Info Panel */}
          {assignedBus && assignedBus.route && (
            <div className="flex-1 mr-6 p-4 border rounded-lg shadow bg-white">
              <h2 className="text-lg font-bold mb-2 text-gray-800">Route Information</h2>
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {assignedBus.route.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Distance:</span> {assignedBus.route.distance} km</p>
              <p className="text-gray-700"><span className="font-semibold">Estimated Time:</span> {assignedBus.route.estimatedTime} mins</p>
              <p className="text-gray-700"><span className="font-semibold">Stops:</span> {assignedBus.route.stops.join(", ")}</p>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 self-start"
          >
            Logout
          </button>
        </div>


      {/* Driver Panel */}
      <DriverPanel assignedBus={assignedBus} />
    </div>
    </>
  );
}

export default DriverPage;
