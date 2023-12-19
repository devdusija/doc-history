import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ViewDocument = () => {
  // Get the current URL location
  const {id} = useParams();

  // Extract the 'id' parameter from the URL query string
//   const searchParams = new URLSearchParams(location.search);
//   const id = searchParams.get('id');

  return (
    <div>
      <h2>Document ID: {id}</h2>
      {/* Other content related to viewing the document */}
    </div>
  );
};

export default ViewDocument;
