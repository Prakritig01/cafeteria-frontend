import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import NavbarLayout from "@/components/NavbarLayout";
import AddCounterModal from "@/components/AddCounterModal";
import { BASE_URL } from "@/utils/apiConfig";

// Redux actions (you'll need to create these in your counterSlice)
import {
  deleteCounter,
  selectAllCounters,
  selectLoading,
  setLoading,
  setCounter,
} from "@/slices/counterSlice";
import { selectAllMerchants, setMerchants } from "@/slices/authSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const counters = useSelector(selectAllCounters);
  const loading = useSelector(selectLoading);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const merchnatsAvailable = useSelector(selectAllMerchants);

  console.log("merchnatsAvailable", merchnatsAvailable);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));

      // Fetch all counters
      const countersResponse = await axios.get(`${BASE_URL}/counter`);
      dispatch(setCounter(countersResponse.data.counters));

      const role = "merchant"; // You can set this dynamically based on user input or context

      const query = role ? `?role=${role}` : "";

      // Make the API call with the constructed query
      const merchantsResponse = await axios.get(`${BASE_URL}/users${query}`);
      // console.log("merchantsResponse", merchantsResponse.data.users);
      dispatch(setMerchants(merchantsResponse.data.users));
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCounter = async (counterData) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/counter`, {
        ...counterData,
        merchant: counterData.merchantIds, // Array of merchant IDs
      });

      // Update Redux state with new counter
      dispatch(setCounter([...counters, response.data.counter]));
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error creating counter:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCounter = async (counterId) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${BASE_URL}/counter/${counterId}`);
      dispatch(deleteCounter(counterId));
    } catch (error) {
      console.error("Error deleting counter:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Counters</h1>
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Counter
          </button>
        </div>

        {counters.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No counters found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {counters.map((counter) => (
              <div
                key={counter._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative h-48">
                  <img
                    src={counter.image || "/placeholder-image.jpg"}
                    alt={counter.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {counter.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {counter.description || "No description available"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {counter.merchant.length} merchants assigned
                    </span>
                    <button
                      onClick={() => handleDeleteCounter(counter._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fi fi-rs-trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddCounterModal
          open={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddCounter}
          merchants={merchnatsAvailable}
        />
      </div>
    </div>
  );
};

export default function AdminPageWrapper() {
  return (
    <NavbarLayout>
      <AdminPage />
    </NavbarLayout>
  );
}
