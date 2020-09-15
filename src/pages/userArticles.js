import { stringify } from "query-string";
import React, { useEffect } from "react";
import BackErrorMessages from "../components/backErrorMessages";
import Feed from "../components/feed";
import Loading from "../components/loading";
import Pagination from "../components/Pagination";
import useFetch from "../hooks/useFetch";
import { getPaginator, limit } from "../utils";

const getApiurl = ({ offset, isFavorites, username }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ location, isFavorites, username, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiurl({ username, offset, isFavorites });
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <BackErrorMessages />}
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
  );
};

export default UserArticles;
