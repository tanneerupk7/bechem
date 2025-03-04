import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserIcon from "../assets/user.png";
import BellIcon from "../assets/notification-bell.png";
import Logo from "../assets/bechemlogo.png";
import HomeIcon from "../assets/home.svg";
import headerImage from "../assets/bechemheader.jpeg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AddUserPopup from "./AddUserPopup";

const HeaderForDashboard = ({
  accountId,
  accountName,
  isAdmin,
  setAccountId,
  setAccountName,
  distributorData,
  onDistributorSelect,
  selectedDistributor,
  setSelectedDistributor,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [showAddNewUserPopup, setShowAddNewUserPopup] = useState(false);
  const location = useLocation();
  const [userStatus, setUserStatus] = useState(false); // Toggle for Active/Inactive
  const [distributor, setDistributor] = useState(""); // Distributor value
  const [userName, setUserName] = useState(""); // User Name value
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [mailId, setMailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [distributors, setDistributors] = useState([]);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const API_URI = import.meta.env.VITE_API_URI;
  const navigate = useNavigate();

  const handleSave = () => {
    // Handle save logic here
    console.log({
      distributor,
      userName,
      contactPerson,
      contactPhone,
      mailId,
      newPassword,
      confirmPassword,
      userStatus,
    });
  };

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch(`${API_URI}/distributors/`);
        const data = await response.json();
        console.log(`Distributor data: ${data}`);
        if (data && data.distributors) {
          // Clean the distributor names by trimming whitespace
          const cleanedDistributors = data.distributors.map((dist) =>
            dist.trim()
          );
          // Debug log
          setDistributors(cleanedDistributors);
        }
      } catch (error) {
        console.error("Error fetching distributors:", error);
      }
    };

    if (isAdmin) {
      fetchDistributors();
    }
  }, [isAdmin]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (e.target.closest(".dropdown-container")) return;
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleDistributorChange = (e) => {
    const selected = e.target.value;

    const filteredDistributor = distributorData.filter(
      (item) => item.ac_name === selected
    );

    setSelectedDistributor(filteredDistributor[0]);

    console.log(filteredDistributor);

    setAccountId(filteredDistributor.ac_id);
    setAccountName(filteredDistributor.ac_name);

    // if (selected) {
    //   // Check if distributorData is defined before using it
    //   if (!distributorData) {
    //     console.error("Distributor data is not available.");
    //     return;
    //   }

    //   // Find the selected distributor from distributorData
    //   const selectedDistributorData = distributorData.find(
    //     (dist) => dist.name === selected
    //   );

    //   if (selectedDistributorData) {
    //     // Set the accountId and accountName using the distributor data
    //     setAccountId(selectedDistributorData.value); // Assuming value is the accountId
    //     setAccountName(selectedDistributorData.name);
    //     onDistributorSelect(
    //       selectedDistributorData.value,
    //       selectedDistributorData.name
    //     ); // Call the handler
    //     setIsDropdownOpen(false); // Hide the dropdown
    //     navigate("/Dashboard"); // Navigate to the dashboard
    //   }
    // }
  };

  console.log("Distributor Data:", distributorData);

  return (
    <>
      {/* Header Section */}
      <header className="bg-customYellow flex justify-between max-h-[62px] relative shadow-[0_4px_6px_-2px_rgba(0,0,0,0.4)]">
        {/* Left Section: Logo and Company Name */}
        <div className="flex items-center space-x-4 ml-2">
          <div className="flex flex-col text-[#15460B]">
            <span className="text-base md:text-lg font-bold">BECHEM INDIA</span>
            <span className="text-xs md:text-sm -mt-1">
              Lubrication Technology
            </span>
          </div>
        </div>

        {/* Right Section: Icons and Dropdown */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {/* Notification Bell Icon - updated to SVG */}
          <Link to={"/Notifications"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* User Icon - updated to SVG */}
          <div className="relative dropdown-container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={toggleDropdown}
            >
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="11.5"
                stroke="#242424"
              />
              <path
                d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Dropdown menu remains the same */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 md:w-48 bg-gray-100 rounded-lg shadow-lg z-50">
                <ul className="flex flex-col">
                  <Link
                    className="px-3 md:px-4 py-2 hover:bg-gray-200 rounded-lg"
                    to={"/Profile"}
                  >
                    Profile
                  </Link>
                  <Link
                    className="px-3 md:px-4 py-2 hover:bg-gray-200 rounded-lg"
                    to={"/UsersDetails"}
                  >
                    User Details
                  </Link>
                  <Link
                    to={"/"}
                    className="px-3 md:px-4 py-2 hover:bg-gray-200 rounded-lg"
                  >
                    Log Out
                  </Link>
                </ul>
              </div>
            )}
          </div>

          {/* Home Icon - updated to SVG */}
          <Link to={"/Dashboard"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="#242424"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Company Logo */}
          <Link to={"/Header"}>
            <img
              src={Logo}
              alt="Company Logo"
              className="h-[62px] cursor-pointer "
            />
          </Link>
        </div>
      </header>

      {/* Navigation Menu with Distributor Dropdown */}
      {isAdmin && !showNavMenu && (
        <div className="c-lg:px-[20%]">
          <nav className="w-[820px] h-[52px] bg-gradient-to-r from-neutral-200 to-[#d9d9d9] shadow-m border px-4 py-4 rounded-br-full rounded-bl-full ">
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
              {/* <li className="relative -mt-2 ">
                <select
                  value={selectedDistributor.ac_name}
                  onChange={handleDistributorChange}
                  className="text-sm font-light cursor-pointer transition-all text-slate-700 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 max-w-[400px] w-full "
                >
                  <option value="">Select Distributor</option>
                  {distributors.map((distributor, index) => (
                    <option key={index} value={distributor}>
                      {distributor}
                    </option>
                  ))}
                </select>
              </li> */}
              <li className="relative -mt-2">
  <div className="relative w-full max-w-[400px]">
    <select
      value={selectedDistributor}
      onChange={handleDistributorChange}
      className="text-sm font-light cursor-pointer transition-all text-slate-700 bg-white rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full appearance-none"
    >
      <option value="">Select Distributor</option>
      {distributors.map((distributor, index) => (
        <option key={index} value={distributor}>
          {distributor}
        </option>
      ))}
    </select>
    {/* Custom Arrow */}
    <svg
      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</li>

            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderForDashboard;
