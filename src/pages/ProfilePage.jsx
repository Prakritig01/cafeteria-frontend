import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavbarLayout from '@/components/NavbarLayout';
import { selectCurrentUser, removeCurrentUser } from '@/slices/authSlice';

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeCurrentUser());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-20">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>
        
        {currentUser ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-24">Username:</span>
              <span className="text-gray-600">{currentUser.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">Email:</span>
              <span className="text-gray-600">{currentUser.email}</span>
            </div>
            
            {/* Add Home and Logout buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleGoHome}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No user information available</p>
        )}
      </div>
    </div>
  );
};

export default function ProfileWrapper() {
  return (
    <NavbarLayout>
      <ProfilePage />
    </NavbarLayout>
  );
}