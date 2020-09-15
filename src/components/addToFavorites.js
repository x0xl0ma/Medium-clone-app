import React from "react";
import useFetch from "../hooks/useFetch";

import classNames from "classnames";

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  const favoritesWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const favoritedWithResonse = response
    ? response.article.favorited
    : isFavorited;

  const buttonClasses = classNames({
    btn: true,
    "btn-sm": true,
    "btn-primary": favoritedWithResonse,
    "btn-outline-primary": !favoritedWithResonse,
  });

  const handleLike = (event) => {
    event.preventDefault();
    doFetch({
      method: favoritedWithResonse ? "delete" : "post",
    });
  };
  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart" />
      <span>&nbsp; {favoritesWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
