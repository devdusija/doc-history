import React, { useState, useEffect } from "react";
import { db } from "../auth/firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

const ApproveDocuments = () => {
  const [pendingDocuments, setPendingDocuments] = useState([]);

  useEffect(() => {
    const fetchPendingDocuments = async () => {
      try {
        const documentsRef = collection(db, "Documents");
        const q = query(documentsRef, where("approved_by_admin", "==", false));
        const querySnapshot = await getDocs(q);
  
        const pendingDocs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPendingDocuments(pendingDocs);
      } catch (error) {
        console.error("Error fetching pending documents: ", error);
      }
    };

    fetchPendingDocuments();
  }, []);

  const handleApprove = async (docId) => {
    try {
      await updateDoc(doc(db, "Documents", docId), { approved_by_admin: true });
      setPendingDocuments(pendingDocuments.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error("Error approving document: ", error);
    }
  };

  const handleReject = async (docId) => {
    try {
      await deleteDoc(doc(db, "Documents", docId));
      setPendingDocuments(pendingDocuments.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error("Error rejecting document: ", error);
    }
  };

  const viewDocument = () => {
    // Make a request to the server to fetch the document
    window.location = "/view-document/12"
    // fetch(`${encodeURIComponent(url)}`)
    //   .then((response) => {
    //     // Handle the response to get the document content from the server
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     // Create a URL for the document blob
    //     const objectURL = URL.createObjectURL(blob);
  
    //     // Open the document in a new tab
    //     const newTab = window.open("", "_blank");
    //     if (newTab) {
    //       newTab.document.write(`<iframe src="${objectURL}" width="100%" height="100%"></iframe>`);
    //     } else {
    //       console.error("Popup blocked. Please allow popups for this site.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching document:", error);
    //   });
  };
  

  return (
    <>
      <Navbar />
      <div className="px-10 min-h-screen bg-gray-700 pt-10 text-white">
        <h1 className="text-3xl font-semibold text-center mb-6">Pending Documents</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-2 px-4 border border-gray-800">Document Name</th>
                <th className="py-2 px-4 border border-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingDocuments.map((doc) => (
                <tr key={doc.id} className="bg-gray-900">
                  <td className="py-2 px-4 border border-gray-800 text-center">{doc.name}</td>
                  <td className="py-2 px-4 border border-gray-800 text-center">
                    <button
                      onClick={() => handleApprove(doc.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-2 focus:outline-none"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(doc.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 mr-2 rounded focus:outline-none"
                    >
                      Reject
                    </button>
                    <button
                    onClick={() => viewDocument()} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded focus:outline-none">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApproveDocuments;
