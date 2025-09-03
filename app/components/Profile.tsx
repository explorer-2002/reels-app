
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function Profile() {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (status === "loading") {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  if (status === "authenticated") {
    return (
      <div className="z-50">
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 border border-gray-600"
          >
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-500"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {session.user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium truncate max-w-[150px]">
              {session.user?.name || session.user?.email}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <div className="flex items-center space-x-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-gray-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {session.user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {session.user?.name && (
                      <p className="text-white font-medium truncate">{session.user.name}</p>
                    )}
                    <p className="text-gray-300 text-sm truncate">{session.user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut({ callbackUrl: '/login' })
                    console.log("Sign out called");
                    setIsDropdownOpen(false);
                    // router.push('/login');
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center cursor-auto space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <span>Sign in</span>
      </Link>
    </div>
  )
}