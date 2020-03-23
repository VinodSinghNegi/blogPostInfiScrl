import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

const SearchBar = React.memo(props => {
  const { store, showSearchedPost } = props;

  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    showSearchedPost(
      store.filter(post => post.title.toLowerCase().includes(searchKey)),
      searchKey
    );
    // eslint-disable-next-line
  }, [searchKey]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      &nbsp;
      <div
        style={{
          backgroundColor: "#f7f2f5",
          borderRadius: 8,
          minHeight: 40
        }}
      >
        &nbsp;
        <TextField
          color="secondary"
          disabled={store.length > 5 ? false : true}
          type="search"
          placeholder="Search Blog By Title"
          onChange={event => setSearchKey(event.target.value)}
        />
      </div>
      &nbsp;
    </div>
  );
});

export default SearchBar;
