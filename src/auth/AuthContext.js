// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null); // New state for admin check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        
        const userDocRef = doc(db, "User", user.email); // Assuming user info is stored in a 'users' collection

        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setIsAdmin(userData.isAdmin); // Assuming 'isAdmin' field in user data determines admin status
          } else {
            setIsAdmin(false); // If user document doesn't exist or 'isAdmin' field is not set
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsAdmin(false); // If no user is signed in
      }
    });

    return () => unsubscribe();
  }, []);



  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      sessionStorage.setItem("user", auth.currentUser?.uid);
      // Optionally return something after successful login if needed
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Rethrow the error to handle it in the Login component
    }
  };
  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      // sessionStorage.setItem("user", auth.currentUser?.uid);
      // Optionally return something after successful login if needed
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Rethrow the error to handle it in the Login component
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error; // Rethrow the error to handle it in the Login component
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    createUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
