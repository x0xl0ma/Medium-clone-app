import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "./loading";
import { Link } from "react-router-dom";
import BackErrorMessages from "./backErrorMessages";

const PopularTags = () => {
  const [{ response, error, isLoading }, doFetch] = useFetch("/tags");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }
  if (error) {
    return <BackErrorMessages backendErrors={error} />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
