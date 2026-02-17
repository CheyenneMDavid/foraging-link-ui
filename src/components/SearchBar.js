// Reusable search input with debounced query updates

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styles from "../styles/SearchBar.module.css";

import Asset from "../components/Asset";

const SearchBar = ({ setQuery }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Debounces the search input to prevent updating the query on every.keystroke
    const timer = setTimeout(() => {
      setQuery(search);
      setLoading(false);
    }, 1000);

    // Clears previous timeout if user types again.
    return () => clearTimeout(timer);
  }, [search, setQuery]);

  return (
    <Form
      className={styles.searchBar}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.inputWrapper}>
        <i className={`fas fa-search ${styles.searchIcon}`} />

        <Form.Control
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Search"
        />

        {loading ? (
          <Asset spinner />
        ) : (
          <div className={styles.spinnerPlaceholder} />
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
