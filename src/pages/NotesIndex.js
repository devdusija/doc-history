import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebase'; // Assuming you have the Firebase database connection set up
import { collection, query, getDocs, where, onSnapshot, QuerySnapshot } from "firebase/firestore";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const NotesIndex = () => {
  const [notes, setNotes] = useState([]);
  // let notes = []
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const notesCollection = collection(db, "Notes");
          const q = query(notesCollection);
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedNotes = []; // Create a new array to hold updated notes
    
            querySnapshot.forEach((doc) => {
              updatedNotes.push({ id: doc.id, ...doc.data() }); // Push new notes to the updatedNotes array
            });;;
    
            setNotes(updatedNotes); // Update the state with the new array of notes
          });
          
          return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
    
      fetchNotes();
    }, []);
  

  const renderNotes = () => {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4'>
        <Link to="/new-notes" className="bg-gray-800 rounded p-4 flex justify-center items-center h-40 cursor-pointer" onClick={handleCreateNew}>
          <button className="text-white text-lg font-semibold" >
            Create New
          </button>
        </Link>
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-800 rounded p-4 h-40">
            <h4 className="text-white  text-xl font-semibold">{note.title}</h4>
            <p className="text-white pt-5">{note.content}</p>
            {/* You can display other note details here */}
          </div>
        ))}
      </div>
    );
  };

  const handleCreateNew = () => {
    // Handle the action for creating a new note
    // For example: navigate to a new note creation page or show a modal
    console.log('Create New Note clicked!');
  };

  return (
    <>
      <Navbar />
      <div className='bg-gray-900 min-h-screen w-full'>
        <h1 className="text-3xl font-semibold text-center mb-4 text-white pt-10 pb-4">Notes</h1>
        {notes.length > 0 ? renderNotes() : <p className="text-white text-center">No notes available</p>}
      </div>
    </>
  );
};

export default NotesIndex;
