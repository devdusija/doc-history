import React from "react";
import {auth} from "./../auth/firebase"
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthContext";
const Dashboard = () => {
    const {isAdmin, currentUser } = useAuth()
    console.log(isAdmin)
  return (
<>
<Navbar/>
    <div className="">
      <h1>Welcome, {isAdmin}</h1>
      <p>This is the dashboard page.</p>
    </div>
</>
  );
};

export default Dashboard;
