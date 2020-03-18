import React, { useEffect, useReducer } from "react";
import axios from "axios";

const saveBlogData = (state, action) => {
  switch (action.type) {
    case "SAVE_BLOGDATA": {
      return action.payload;
    }
    default:
      return state;
  }
};

const Home = () => {
  const [store, dispatch] = useReducer(saveBlogData, []);

  const getBlogData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        dispatch({ type: "SAVE_BLOGDATA", payload: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlogData();
  }, []);

  console.log(store);

  return (
    <div>
      {store.length > 0 ? (
        <>{store.map(ele => ele.title)}</>
      ) : (
        "No Data,API Must Have Failed"
      )}
    </div>
  );
};
export default Home;
