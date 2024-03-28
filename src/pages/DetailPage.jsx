import React from "react";
import { getNote } from "../utils/local-data";
import NoteDetail from "../components/NoteDetail";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NotFoundPage from "./NotFoundPage";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
  }

  render() {
    if (this.state.note === undefined) {
      return <NotFoundPage />;
    }

    return <NoteDetail {...this.state.note} />;
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};
export default DetailPageWrapper;
