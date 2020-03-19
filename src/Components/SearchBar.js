import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

const SearchBar = React.memo(props => {
  const { store, showSearchedPost } = props;

  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    showSearchedPost(
      store.filter(post => post.title.includes(searchKey)),
      searchKey
    );
    // eslint-disable-next-line
  }, [searchKey]);

  return (
    <div>
      <TextField
        disabled={store.length > 0 ? false : true}
        type="search"
        placeholder="Search Blog By Title"
        onChange={event => setSearchKey(event.target.value)}
      />
    </div>
  );
});

export default SearchBar;
