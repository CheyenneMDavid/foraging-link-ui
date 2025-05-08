// SearchBar is a reusable component that can be used in different places.

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styles from "../styles/SearchBar.module.css";

import Asset from "../components/Asset";

const SearchBar = ({ setQuery }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setQuery(search); // Updates the search query
      setLoading(false); // Spinner is hidden after search query.
    }, 1000);
    return () => clearTimeout(timer); // Clears the timer on input change
  }, [search, setQuery]);

  // Renders search input with feedback from spinner.
  return (
    <Form
      className={styles.SearchBar}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.InputWrapper}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />

        <Form.Control
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Search"
        />
        {/* Spinner in header, giving feedback  */}
        {loading ? (
          <Asset spinner />
        ) : (
          <div className={styles.SpinnerPlaceholder} />
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
