import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  return (
    <>
      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} id={note.id} {...note} />)
      ) : (
        <div className="notes-list-empty">
          <p>Tidak ada catatan</p>
        </div>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
