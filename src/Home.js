import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderPost from "./Components/RenderPost";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

import { makeStyles } from "@material-ui/core/styles";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const Home = () => {
  const classes = useStyles();
  const [store, setStore] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setTimeout(() => {
          setStore(response.data);
          setError(null);
        }, 500);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className={classes.container}>
      {store.length > 0 ? (
        <RenderPost store={store} />
      ) : error ? (
        error
      ) : (
        <>
          <br />
          Loading...
          <br />
          <br />
          <HashLoader
            css={override}
            size={100}
            color="#4495e5"
            loading={true}
          />
        </>
      )}
    </div>
  );
};
export default Home;
