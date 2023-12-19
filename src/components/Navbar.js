import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
// import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
    const {isAdmin } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const {logout} = useAuth()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">
                    Your Logo
                </Link>
                <div className="hidden md:flex md:space-x-4">
           
                    <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Chat
                    </Link>
                    {isAdmin && (
                        <>

                    <Link
                        to="/create-user"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                    >
                        Create user
                    </Link>

                    <Link
                    to="/approve-document"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                    >
                    Approve Document
                    </Link>
                        </>
                    )}
                    <Link
                        to="/notes"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Notes
                    </Link>
                    <Link
                        to="/upload-document"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                    >
                        Upload Document
                    </Link>
                    <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await logout();
                            }}
                            className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none focus:text-white"
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
                <div className="flex flex-col space-y-2">
                    <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
                    >
                        Chat
                    </Link>
                    <Link
                        to="/create-user"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
                    >
                        Create user
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
                    >
                        Notes
                    </Link>
                    <Link
                        to="/upload-document"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
                    >
                        Upload Document
                    </Link>
                    <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await logout();
                            }}
                            className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
