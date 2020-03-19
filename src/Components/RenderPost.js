import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper
} from "@material-ui/core/";
import "../Utils/configuration.css";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import SearchBar from "./SearchBar";
const useStyles = makeStyles({
  root: {
    maxWidth: 850,
    margin: 10,
    backgroundImage: "url(Assets/1.jpg)"
  },
  media: {
    height: 150
  },
  nav: {
    zIndex: 1,
    width: 850,
    height: 100,
    borderRadius: 5,
    fontSize: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    backgroundColor: "#9EC9F6"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: "120px",
    maxHeight: "950px",
    overflow: "auto"
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
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const scrollref = useRef();

  const loadMorePost = () => {
    if (
      !loading &&
      !searchKey &&
      scrollref.current.scrollTop + scrollref.current.clientHeight >=
        scrollref.current.scrollHeight
    ) {
      setLoading(true);
      setTimeout(() => {
        setLimit(prev => prev + 4);
      }, 2000);
    }
  };

  useEffect(() => {
    setRenderPost(store.slice(0, limit));
    setSearchStore(store.slice(0, limit));
    setLoading(false);
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
      <div className={classes.nav}>
        <SearchBar store={searchStore} showSearchedPost={showSearchedPost} />
      </div>

      <Paper
        className={classes.paper}
        elevation={3}
        ref={scrollref}
        onScroll={loadMorePost}
      >
        {renderPost.length > 0
          ? renderPost.map(post => (
              <Card className={classes.root} key={post.id}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="#" title="Blog" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      {post.body}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="medium" color="primary">
                    Share
                  </Button>
                </CardActions>
                {loading ? (
                  <HashLoader
                    css={override}
                    size={40}
                    color="#4495e5"
                    loading={loading}
                  />
                ) : (
                  ""
                )}
              </Card>
            ))
          : "No Post Found !"}
      </Paper>
    </div>
  );
}
