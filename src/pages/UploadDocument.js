import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../auth/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";
const UploadDocument = () => {
  const {isAdmin} = useAuth()
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [draggingOver, setDraggingOver] = useState(false); // State to track drag over
  const dropRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      setSelectedDocument(file);
      setNotice("");
    } else {
      setNotice("Please upload a .txt file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggingOver(true);
  };
  const handleDragLeave = () => {
    setDraggingOver(false); // Update state to remove dragging feedback
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      setSelectedDocument(file);
      setNotice("");
    } else {
      setNotice("Please upload a .txt file");
    }
    setDraggingOver(false); // Reset dragging state after drop
  };

  const handleUpload = async () => {
    if (!selectedDocument) {
      setNotice("Please select a file to upload");
      return;
    }

    setUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${selectedDocument.name}`);
      uploadBytes(storageRef, selectedDocument).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      getDownloadURL(storageRef).then(async (url) => {
        await setDoc(doc(db, "Documents", selectedDocument.name), {
          name: selectedDocument.name,
          url: url,
          approved_by_admin: isAdmin ? true : false,
          trained_on_model: false
        });
        toast.success('Document Uploaded Sucessfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      });

      setUploading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error('Error uploading document', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setUploading(false);
      console.error("Error uploading document:", error);
      // setNotice("Error uploading document. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen flex items-center justify-center bg-gray-900 text-white ${
          draggingOver ? "opacity-50" : "" // Apply opacity when dragging
        }`}
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave} // Handle drag leave event
        onDrop={handleDrop}
      >
        <div className="max-w-md w-full mx-auto p-8 bg-gray-800 rounded shadow-md mx-5">
          <form className="space-y-6">
            {notice !== "" && (
              <div className="bg-red-500 border-l-4 border-indigo-600 text-white p-4">
                {notice}
              </div>
            )}

            <h1 className="text-3xl font-semibold text-center mb-4">
              Upload Document
            </h1>
            <div className="space-y-4">
              <div className="border-dashed border-2 border-gray-600 p-6 text-center">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-gray-300"
                >
                  {selectedDocument ? (
                    <p>Selected File: {selectedDocument.name}</p>
                  ) : (
                    <p>Drag & Drop or Click to Upload</p>
                  )}
                </label>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500"
                  disabled={uploading || !selectedDocument}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadDocument;
