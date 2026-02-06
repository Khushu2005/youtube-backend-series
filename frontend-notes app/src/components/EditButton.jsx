import React from 'react';
import '../styles/NoteButtons.scss'; 

const EditButton = ({ onClick }) => {
  return (
    <button className="btn-edit" onClick={onClick} title="Edit Note">
      <span></span> Edit
    </button>
  );
};

export default EditButton;