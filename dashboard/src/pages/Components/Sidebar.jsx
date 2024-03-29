import React from "react"
import { BsShopWindow } from "react-icons/bs"
import {
  FiHome,
  FiSettings,
  FiCreditCard,
  FiLink,
  FiKey,
  FiBarChart,
} from "react-icons/fi"

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="absolute bottom-0 left-0 w-1/6 p-4 bg-gray-200 top-16">
      <ul>
        <li
          onClick={() => setActiveTab("home")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "home" && "text-blue-600 bg-gray-300"
          }`}
        >
          <FiHome className="mr-2" /> Home
        </li>
        <li
          onClick={() => setActiveTab("users")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "users" && "bg-gray-300 text-blue-500"
          }`}
        >
          <FiCreditCard className="mr-2" /> Payment Methods
        </li>
        <li
          onClick={() => setActiveTab("transactions")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "transactions" && "bg-gray-300 text-blue-600"
          }`}
        >
          <FiBarChart className="mr-2" /> Transactions
        </li>
        <li
          onClick={() => setActiveTab("stores")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "stores" && "bg-gray-300 text-blue-500"
          }`}
        >
          <BsShopWindow className="mr-2" /> Stores
        </li>
        <li
          onClick={() => setActiveTab("settings")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "settings" && "bg-gray-300 text-blue-500"
          }`}
        >
          <FiSettings className="mr-2" /> Settings
        </li>
        <li
          onClick={() => setActiveTab("webhooks")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "webhooks" && "bg-gray-300 text-blue-500"
          }`}
        >
          <FiLink className="mr-2" /> Web Hooks
        </li>
        <li
          onClick={() => setActiveTab("apiKeys")}
          className={`flex cursor-pointer rounded-md items-center mb-4 py-2 px-4 hover:bg-gray-300 ${
            activeTab === "apiKeys" && "bg-gray-300 text-blue-500"
          }`}
        >
          <FiKey className="mr-2" /> API keys
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
