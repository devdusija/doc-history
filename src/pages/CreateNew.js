import { useState } from "react";
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Navbar from "../components/Navbar";
const NotesApp = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleCreateNote = () => {
    const content = editorState.getCurrentContent().getPlainText();
    console.log("Title:", title);
    console.log("Content:", content);
    // You can add logic to save the note here
  };

  return (
    <>
    <Navbar/>
    <div className="w-full mr-[5%]">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-[90%] p-2 font-bold border-none focus:border-none focus"/>
    </div>
            </>
  );
};

export default NotesApp;
