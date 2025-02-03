import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import NavbarLayout from "@/components/NavbarLayout";
import AddCounterModal from "@/components/AddCounterModal";
import EditCounterModal from "@/components/EditCounterModal"; // Add Edit Modal component
import { BASE_URL } from "@/utils/apiConfig";

// Redux actions (you'll need to create these in your counterSlice)
import {
  deleteCounter,
  selectAllCounters,
  selectLoading,
  setLoading,
  setCounter,
  updateCounter,
  selectCurrentCounter,
  setCurrentCounter,
} from "@/slices/counterSlice";
import { selectAllMerchants, setMerchants } from "@/slices/authSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const counters = useSelector(selectAllCounters);
  const loading = useSelector(selectLoading);
  const currentCounter = useSelector(selectCurrentCounter);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for Edit Modal
  const merchnatsAvailable = useSelector(selectAllMerchants);

  // console.log("merchants", merchnatsAvailable);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(setLoading(true));

      // Fetch all counters
      const countersResponse = await axios.get(`${BASE_URL}/counter` ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCounter(countersResponse.data.counters));

      const role = "merchant"; // You can set this dynamically based on user input or context
      const query = role ? `?role=${role}` : "";

      // Fetch all merchants
      const merchantsResponse = await axios.get(`${BASE_URL}/users${query}`,{
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
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
      },{
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(setCounter([...counters, response.data.counter]));
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error creating counter:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditCounter = async (updatedCounter) => {
    try {
      console.log("flow here in handle edit counter", updatedCounter);
      dispatch(setLoading(true));
      const response = await axios.patch(
        `${BASE_URL}/counter/${updatedCounter._id}`,
        updatedCounter,{
          headers : {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("response in edit", response);

      dispatch(updateCounter(response.data.counter)); // Update the counter in Redux
      setEditModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating counter:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCounter = async (counterId) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${BASE_URL}/counter/${counterId}`,{
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(deleteCounter(counterId)); // Remove the counter from Redux
    } catch (error) {
      console.error("Error deleting counter:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getSortedMerchantNames = (counter) => {
    return counter.merchant
      .map((merchant) => merchant.name) // Extract merchant names
      .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
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
              // console.log("counter", counter),
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

                  {/* Display the names of the merchants assigned */}
                  <span className="text-sm text-gray-500">
                    {getSortedMerchantNames(counter).map((name, index) => (
                      <span key={name}>
                        {name}
                        {index < getSortedMerchantNames(counter).length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </span>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          dispatch(setCurrentCounter(counter));
                          setEditModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <i className="fi fi-rr-edit" />
                      </button>
                      <button
                        onClick={() => handleDeleteCounter(counter._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fi fi-rs-trash" />
                      </button>
                    </div>
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

        {/* Edit Counter Modal */}
        {isEditModalOpen && currentCounter && (
          <EditCounterModal
            counter={currentCounter}
            open={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditCounter}
            merchants={merchnatsAvailable}
          />
        )}
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
