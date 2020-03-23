import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Paper
} from "@material-ui/core/";
import "../Utils/configuration.css";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import SearchBar from "./SearchBar";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "60%"
  },
  nav: {
    marginTop: 10,
    width: "100%",
    height: 50,
    borderRadius: 5,
    fontSize: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#E60D57",
    backgroundImage: "url(Assets/3.jpg)"
  },
  paper: {
    marginTop: 20,
    width: "100%",
    maxHeight: "80vh",
    overflow: "auto",
    backgroundColor: "#fbf7fd"
  },
  card: {
    margin: 50,
    borderRadius: "20px"
  },
  media: {
    height: 240
  }
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function RenderPost({ store }) {
  const [renderPost, setRenderPost] = useState([]);
  const [searchStore, setSearchStore] = useState([]);
  const [searchKey, setSearchKey] = useState(null);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const scrollref = useRef();

  const loadMorePost = () => {
    if (
      !loading &&
      !searchKey &&
      limit <= store.length &&
      scrollref.current.scrollTop + scrollref.current.clientHeight >=
        scrollref.current.scrollHeight
    ) {
      setLoading(true);
      setTimeout(() => {
        setLimit(prev => prev + 5);
      }, 2000);
    }
  };

  useEffect(() => {
    setLoading(false);
    setRenderPost(store.slice(0, limit));
    setSearchStore(store.slice(0, limit));
  }, [limit, store]);

  const showSearchedPost = (searchResult, searchKey) => {
    if (searchKey) {
      setRenderPost(searchResult);
      setSearchKey(searchKey);
    } else {
      setRenderPost(store.slice(0, limit));
      setSearchKey(null);
    }
  };
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.nav}>
        <b> &nbsp; My Favourite Blogs</b>
        {loading ? (
          <>
            <HashLoader
              css={override}
              size={35}
              color="#E60D57"
              loading={loading}
            />
          </>
        ) : (
          ""
        )}
        <SearchBar store={searchStore} showSearchedPost={showSearchedPost} />
      </Paper>
      <Paper
        className={classes.paper}
        elevation={3}
        ref={scrollref}
        onScroll={loadMorePost}
      >
        {renderPost.length > 0 ? (
          renderPost.map((post, index) => (
            <center key={post.id}>
              <Card className={classes.card}>
                <a href={post.links.html}>
                  <CardMedia
                    className={classes.media}
                    image={post.cover_photo.urls.regular}
                    title={"Visit " + post.title + " on Unsplash Website"}
                  />
                </a>

                <CardContent>
                  <Typography>{post.title.toUpperCase()}</Typography>

                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "15px" }}
                  >
                    {post.tags.map(tag =>
                      tag.source ? tag.source.description : ""
                    )}
                  </Typography>
                </CardContent>
              </Card>
              {loading && index + 1 === limit ? (
                <>
                  <HashLoader
                    css={override}
                    size={35}
                    color="#2c90e8"
                    loading={loading}
                  />
                </>
              ) : (
                ""
              )}
            </center>
          ))
        ) : (
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                image="Assets/error.jpg"
                title="Blog"
                style={{ height: 400 }}
              />
            </CardActionArea>
          </Card>
        )}
      </Paper>
    </div>
  );
}
