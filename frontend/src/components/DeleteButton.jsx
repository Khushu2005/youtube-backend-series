import React from 'react';
import '../styles/NoteButtons.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <button className="btn-delete" onClick={onClick} title="Delete Note">
      <span></span> Delete
    </button>
  );
};

export default DeleteButton;