import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderPost from "./Components/RenderPost";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import { makeStyles } from "@material-ui/core/styles";

const key = "EEnadRv6rmSQl85Va4pHps162m3mKan_ujUUnN3xzFU";
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
      .get(
        `https://api.unsplash.com/collections?page=${3}&per_page=${30}&client_id=${key}`
      )
      .then(response => {
        setStore(response.data);
        setError(null);
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
          <HashLoader css={override} size={80} color="#4495e5" loading={true} />
        </>
      )}
    </div>
  );
};
export default Home;
