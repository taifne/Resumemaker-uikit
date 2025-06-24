import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
  } from "react-icons/fa";
  
  interface User {
    _id: string;
    displayName: string;
    email?: string;
    phone?: string;
    address?: string;
    startDate?: string;
    isActive?: boolean;
    role?: string;
  }
  
  const UserCard = (user: User | undefined) => {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-indigo-100 dark:bg-indigo-800 rounded-xl">
            <FaUser className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {user?.displayName ?? ""}
          </h1>
          {user?.isActive !== undefined && (
            <span
              className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
                user.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          )}
        </div>
  
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {user?.email && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <FaEnvelope className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-600">{user.email}</p>
                </div>
              </div>
            )}
  
            {user?.phone && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <FaPhone className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-600">{user.phone}</p>
                </div>
              </div>
            )}
  
            {user?.address && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <FaBuilding className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-medium text-gray-600">{user.address}</p>
                </div>
              </div>
            )}
          </div>
  
          {/* Right Column */}
          <div className="space-y-6">
            {user?.role && (
              <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role</p>
                <p className="font-medium text-gray-600">{user.role}</p>
              </div>
            )}
  
            {user?.startDate && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                <FaCalendarAlt className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                  <p className="font-medium text-gray-600">
                    {new Date(user.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  