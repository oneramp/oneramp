import Link from "next/link"
import React, { useState } from "react"

const Navbar = ({ picture }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="text-gray-100 px-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center cursor-pointer">
          <img src="/oneramp.svg" alt="Logo" className="mr-2 h-full w-24" />
        </div>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleToggleDropdown}
          >
            {picture && (
              <div className="h-8 w-8 rounded-full bg-gray-400 relative">
                <img
                  src={picture}
                  alt={"User picture"}
                  className="h-full w-8 rounded-full"
                />
              </div>
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute bg-white text-gray-900 right-0 mt-2 py-2 w-48 rounded-lg shadow-xl z-10">
              <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-300">
                Profile
              </a>
              <Link
                href="/api/auth/logout"
                className="block w-full text-left px-4 flex-row  py-2 text-sm hover:bg-gray-300"
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
