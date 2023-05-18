import Link from "next/link"
import React, { useState } from "react"

const Navbar = ({ picture }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-20 h-16 px-5 text-gray-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center cursor-pointer">
          <img src="/oneramp.svg" alt="Logo" className="w-24 h-full mr-2" />
        </div>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleToggleDropdown}
          >
            {picture && (
              <div className="relative w-8 h-8 bg-gray-400 rounded-full">
                <img
                  src={picture}
                  alt={"User picture"}
                  className="w-8 h-full rounded-full"
                />
              </div>
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 w-48 py-2 mt-2 text-gray-900 bg-white rounded-lg shadow-xl">
              <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-300">
                Profile
              </a>
              <Link
                href="/api/auth/logout"
                className="flex-row block w-full px-4 py-2 text-sm text-left hover:bg-gray-300"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
