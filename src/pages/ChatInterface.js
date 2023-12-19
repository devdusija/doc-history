// import { useEffect, useState } from "react";
// import axios from "axios";
// import firebase from "firebase/database";
// import "firebase/database";

// // Initialize Firestore
// const db = firebase.Firestore();

// const ChatInterface = ({ currentUser }) => {
//   const [query, setQuery] = useState("");
//   const [botResponse, setBotResponse] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchBotResponse = async () => {
//       if (!query.trim()) return;

//       setIsLoading(true);
//       try {
//         const response = await axios.post("your_bot_endpoint", { query });
//         setBotResponse(response.data.response);

//         // Store chat data in Firestore
//         await db.collection("chats").add({
//           user: currentUser.email,
//           query,
//           botResponse: response.data.response,
//           feedback,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//       } catch (error) {
//         console.error("Error fetching bot response: ", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBotResponse();
//   }, [query, currentUser, feedback]);

//   const handleFeedback = async (satisfaction) => {
//     setFeedback(satisfaction);

//     // Update Firestore with feedback
//     await db.collection("chats").add({
//       user: currentUser.email,
//       query,
//       botResponse,
//       feedback: satisfaction,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {/* Display chat messages here */}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             <p>User: {query}</p>
//             <p>Bot: {botResponse}</p>
//           </div>
//         )}
//       </div>

//       {/* Input field for user query */}
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Type your message..."
//       />

//       {/* Feedback options */}
//       <div>
//         <button onClick={() => handleFeedback("satisfied")}>Satisfied</button>
//         <button onClick={() => handleFeedback("unsatisfied")}>Unsatisfied</button>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
