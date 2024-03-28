import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils/index";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";

function NoteDetail({ id, title, createdAt, body, archived }) {
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    deleteNote(id);
    navigate("/");
  };

  const onArchiveHandler = () => {
    archived ? unarchiveNote(id) : archiveNote(id);
    navigate("/");
  };

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      <div className="detail-page__action">
        {archived ? (
          <button className="action" type="button" title="Aktifkan" onClick={onArchiveHandler}>
            <RiInboxUnarchiveLine />
          </button>
        ) : (
          <button className="action" type="button" title="Arsipkan" onClick={onArchiveHandler}>
            <HiOutlineArchiveBoxArrowDown />
          </button>
        )}
        <button className="action" type="button" title="Hapus" onClick={onDeleteHandler}>
          <FaRegTrashAlt />
        </button>
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteDetail;
