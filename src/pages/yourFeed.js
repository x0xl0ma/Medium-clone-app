import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Feed from "../components/feed";
import Pagination from "../components/Pagination";
import { getPaginator } from "../utils";
import { stringify } from "query-string";
import { limit } from "../utils";
import Loading from "../components/loading";
import PopularTags from "../components/popularTags";
import FeedToggler from "../components/feedTogler";
import BackErrorMessages from "../components/backErrorMessages";

const YourFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles/feed?${stringifyParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const url = match.url;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <BackErrorMessages backendErrors={error} />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
