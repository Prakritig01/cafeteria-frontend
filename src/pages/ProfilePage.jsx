import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavbarLayout from '@/components/NavbarLayout';
import { selectCurrentUser, removeCurrentUser } from '@/slices/authSlice';
import { FaHome, FaSignOutAlt } from 'react-icons/fa'; // Font Awesome icons

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

  // Safely handle username/name inconsistency
  const getUserName = () => {
    return currentUser?.username || currentUser?.name || 'Not available';
  };

  // Format role display
  const formatRole = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto p-4 mt-20 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">No user information available</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-transparent text-gray-600 font-medium py-1 px-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-20 ">
      <div className="bg-white rounded-lg shadow-md p-6 ">
        <div className="flex flex-col items-center mb-6">
          <i className="fi fi-tr-circle-user text-6xl text-gray-500 mb-4"></i>
          <h1 className="text-3xl font-bold text-gray-800">{getUserName()}</h1>
          <p className="text-gray-500 mt-2">{currentUser.email}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <span className="font-semibold text-gray-600">Username:</span>
            <span className="col-span-2 text-gray-800">{getUserName()}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="col-span-2 text-gray-800 break-all">{currentUser.email}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <span className="font-semibold text-gray-600">Role:</span>
            <span className="col-span-2 text-gray-800">{formatRole(currentUser.role)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleGoHome}
            className="flex-1 bg-transparent text-gray-600 font-medium py-1 px-6 rounded-md   flex items-center justify-center gap-2 "
          >
            <FaHome className="h-5 w-5 text-gray-600" />
            <span>Home</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-transparent text-gray-600 font-medium py-1 px-6 rounded-md  flex items-center justify-center gap-2 transition-shadow"
          >
            <FaSignOutAlt className="h-5 w-5 text-gray-600" />
            <span>Logout</span>
          </button>
        </div>
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
