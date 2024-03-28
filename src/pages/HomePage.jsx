import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { IoMdAddCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
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
    const activeNotes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase()));

    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <section className="search-bar">
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        </section>

        <section className="notes-list">
          <NoteList notes={activeNotes} />
        </section>

        <div className="homepage__action">
          <Link to="/add">
            <button className="action" type="button" title="Tambah">
              <IoMdAddCircleOutline />
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
