import React from "react";
import { getArchivedNotes } from "../utils//local-data";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function ArchivesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return <ArchivesPage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const archivedNotes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase()));

    return (
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <section className="search-bar">
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        </section>
        <section className="notes-list">
          <NoteList notes={archivedNotes} />
        </section>
      </section>
    );
  }
}

ArchivesPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivesPageWrapper;
