import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import {
  selectCurrentUser,
  selectMerchantCounters,
  setMerchantCounters,
  deleteMerchantCounter,
} from "@/slices/authSlice";

import {
  setCurrentCounter,
  selectLoading,
  setLoading,
  updateCounter,
  selectCurrentCounter,
  deleteCounter,
} from "@/slices/counterSlice";
import { BASE_URL } from "@/utils/apiConfig";
import NavbarLayout from "@/components/NavbarLayout";
import EditCounterModal from "@/components/EditCounterModal"; // Import the modal component
import { useNavigate } from "react-router-dom";

const MerchantPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const counters = useSelector(selectMerchantCounters);
  const loading = useSelector(selectLoading);
  const currentCounter = useSelector(selectCurrentCounter);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMerchantCounters = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `${BASE_URL}/counter/merchant/${currentUser._id}`
        );
        dispatch(setCurrentCounter(null));
        dispatch(setMerchantCounters(response.data.counter));
      } catch (error) {
        console.error("Error fetching counters:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchMerchantCounters();
  }, [currentUser]);

  const handleCardClick = (counter) => {
    navigate(`/counter/${counter._id}`); // Navigate to counter details page
  };

  const openEditModal = (counter, e) => {
    e.stopPropagation(); // Prevent navigation on edit button click
    dispatch(setCurrentCounter(counter));
    setModalOpen(true);
  };

  const handleEditSubmit = async (updatedCounter) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/counter/${updatedCounter._id}`,
        updatedCounter
      );
      dispatch(updateCounter(response.data.counter));
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating counter:", error);
    }
  };

  const handleDeleteCounter = async (id) => {
    try {
      dispatch(setLoading(true)); // Dispatch instead of calling setLoading directly
      const response = await axios.delete(`${BASE_URL}/counter/${id}`);
      
      dispatch(deleteMerchantCounter(response.data.counter));
      dispatch(deleteCounter(response.data.counter));
      
      console.log("Counter deleted successfully", response.data);
    } catch (error) {
      console.error("Failed to delete counter", error);
    } finally {
      dispatch(setLoading(false)); // Ensure loading state is reset
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Counters</h1>

        {counters.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No counters found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {counters.map((counter) => (
              <div
                key={counter._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleCardClick(counter)}
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

                  {/* Edit Button */}
                  <button
                    className="mt-2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      console.log("counter", counter),
                        openEditModal(counter, e);
                    }}
                  >
                    <i className="fi fi-rr-edit text-sm" />
                  </button>

                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-2xl" onClick={() => handleDeleteCounter(counter._id)}>
                    <i className="fi fi-rs-trash text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {isModalOpen && (
          <EditCounterModal
            counter={currentCounter}
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleEditSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default function MerchantPageWrapper() {
  return (
    <NavbarLayout>
      <MerchantPage />
    </NavbarLayout>
  );
}
