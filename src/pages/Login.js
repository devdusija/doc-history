import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (inputEmail) => {
    // Basic email validation using regular expression
    const re = /\S+@\S+\.\S+/;
    return re.test(inputEmail);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner while processing

    if (!email || !password) {
      setLoading(false);
      setNotice("Email and password are required");
      return;
    }

    if (!isValidEmail(email)) {
      setLoading(false);
      setNotice("Please enter a valid email");
      return;
    }

    try {
      await login(email, password)
      .then(()=>{

        toast.success('Logged in', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
      setLoading(false); // Hide spinner after successful authentication
      sessionStorage.setItem("user", email); // Storing user's email in session storage
      navigate("/dashboard");
    } catch (error) {
      setLoading(false); // Hide spinner if there's an error
      if (error.code === "auth/wrong-password") {
        setNotice("Incorrect password");
      } else {
        toast.error('Error signing in: Incorrect Credentials', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        // setNotice(`Error signing in: Incorrect Credentials`);
      }
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.removeItem("user");
      // Optionally perform any additional actions after logout if needed
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {loading ? (
        <PacmanLoader
          color="#ffffff"
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
        />
      ) : (
        
        <div className="max-w-md w-full mx-auto p-8 bg-gray-800 rounded shadow-md mx-5">
                  
          <form className="space-y-6">
            {notice !== "" && (
              <div className="bg-red-500 border-l-4 border-indigo-600 text-white p-4">
                {notice}
              </div>
            )}

            <h1 className="text-3xl font-semibold text-center mb-4">Welcome</h1>
            <div className="space-y-4">
              <div>
                <label htmlFor="exampleInputEmail1" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  id="exampleInputEmail1"
                  className="mt-1 block w-full rounded-md border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-100 placeholder-gray-400 p-3"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="exampleInputPassword1" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="exampleInputPassword1"
                    className="mt-1 block w-full rounded-md border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-100 placeholder-gray-400 p-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500"
                  onClick={handleLogin}
                  disabled={!email || !password || !isValidEmail(email)}
                >
                  Submit
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
