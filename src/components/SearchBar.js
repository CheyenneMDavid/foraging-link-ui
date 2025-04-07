// SearchBar is a reusable component that ban be called into different places.

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ setQuery }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, setQuery]);

  return (
    <Form
      className={styles.SearchBar}
      onSubmit={(event) => event.preventDefault()}
    >
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      <Form.Control
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        placeholder="Search"
      />
    </Form>
  );
};

export default SearchBar;
