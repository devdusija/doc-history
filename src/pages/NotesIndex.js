import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebase'; // Assuming you have the Firebase database connection set up
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, QuerySnapshot } from "firebase/firestore";
import Navbar from '../components/Navbar';


const NotesIndex = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the database when the component mounts
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, "Notes");
        // Replace 'notes' with your collection name
        const q = query(notesCollection)
        const fetchedNotes = await getDocs(q)
        const notes = fetchedNotes.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        setNotes(notes)
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to render each note
  const renderNotes = () => {
    return notes.map((note) => (
       <div className='grid grid-cols-4 gap-4 mx-4'>
          <div  className="bg-gray-800 rounded p-4 h-[400px] border-dotted border-2 border-sky-500 flex justify-center content-center">
        <p className="text-white">Create New</p>
       
      </div>
      <div key={note.id} className="bg-gray-800 rounded p-4 ">
        <p className="text-white">{note.content}</p>
        {/* You can display other note details here */}
      </div>
       </div>
    
    ));
  };

  return (
    <>
    <Navbar/>
    <div className='bg-gray-900 min-h-screen w-[100%]'>
      <h1 className="text-3xl font-semibold text-center mb-4 text-white pt-10 pb-4"> Notes</h1>
      {notes.length > 0 ? renderNotes() : <p>No notes available</p>}
    </div>
    </>
  );
};

export default NotesIndex;
