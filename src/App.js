import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatInterface from "./pages/ChatInterface";
import UploadDocument from "./pages/UploadDocument";
import CreateUser from "./pages/CreateUser";
import Notes from "./pages/NotesIndex";
import ApproveDocuments from "./pages/ApproveDocument";
import ViewDocument from "./pages/ViewDocument";
import CreateNew from "./pages/CreateNew";
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

const AdminRoute = ({ element: Element, ...rest }) => {
  const { currentUser , isAdmin } = useAuth();
  
  if (currentUser && isAdmin) {
    return <Element {...rest} />;
  }
  return <Navigate to="/" />;
  
};





const AuthenticatedApp = () => {
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if both currentUser and isAdmin have been fetched
    if (currentUser !== undefined && isAdmin !== undefined) {
      setIsLoading(false);
    }
  }, [currentUser, isAdmin]);

  if (isLoading) {
    return null; // or a loading indicator
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        {/* <Route
          path="/login"
          element={<Login />}
        /> */}
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={Notes} />} /> */}

        <Route path="/upload-document" element={<ProtectedRoute element={UploadDocument} />} />
        <Route path="/create-user" element={<AdminRoute element={CreateUser} />} />
        <Route path="/approve-document" element={<AdminRoute element={ApproveDocuments} />} />
        <Route path="/view-document/:id" element={<ProtectedRoute element={ViewDocument} />} />
        <Route path="/notes" element={<ProtectedRoute element={Notes} />} />
        <Route path="/new-notes" element={<ProtectedRoute element={CreateNew} />} />

        {/* <Route path="/view-document/:id" element={<ViewDocument/>} /> */}





        {/* <Route path="/chat" element={<ProtectedRoute element={ChatInterface } />} /> */}

      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default App;
