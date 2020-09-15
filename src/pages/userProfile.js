import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserArticles from "./userArticles";

const UserProfile = ({ match, location }) => {
  const slug = match.params.slug;

  const isFavorites = location.pathname.includes("favorites");

  const apiUrl = `/profiles/${slug}`;

  const [{ response }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={response.profile.image} alt="" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="article-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              isFavorites={isFavorites}
              location={location}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
