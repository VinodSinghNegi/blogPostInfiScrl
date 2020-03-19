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
    marginBottom: 30,
    backgroundImage: "url(Assets/1.jpg)",
    borderRadius: "20px"
  },
  media: {
    height: 150,
    opacity: 1
  },
  nav: {
    marginTop: 10,
    width: 880,
    height: 80,
    borderRadius: 5,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#E60D57",
    backgroundImage: "url(Assets/3.jpg)"

    // backgroundColor: "#9EC9F6"
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    width: 880,
    height: 1320,
    marginTop: 20,
    maxHeight: "85vh",
    overflow: "auto",
    backgroundColor: "#fbf7fd"
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
      limit < store.length &&
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
      <Paper elevation={3} className={classes.nav}>
        <b> &nbsp; My Favourite Blogs</b>
        {loading ? (
          <HashLoader
            css={override}
            size={35}
            color="#E60D57"
            loading={loading}
          />
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
          renderPost.map(post => (
            <Card className={classes.root} key={post.id}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="Assets/1.jpg"
                  title="Blog"
                />
                <Paper elevation={3} style={{ opacity: 0.9 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title.toUpperCase()}
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      {post.body}
                    </Typography>
                  </CardContent>
                </Paper>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button size="medium" color="primary">
                  Share
                </Button>
                <div>
                  {loading && post.id === limit ? (
                    <HashLoader
                      css={override}
                      size={35}
                      color="#2c90e8"
                      loading={loading}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div> </div>
              </CardActions>
            </Card>
          ))
        ) : (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                style={{ height: 400 }}
                image="Assets/error.jpg"
                title="Blog"
              />
            </CardActionArea>
          </Card>
        )}
      </Paper>
    </div>
  );
}
