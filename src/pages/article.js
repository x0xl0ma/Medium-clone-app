import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, Redirect } from "react-router-dom";
import Loading from "../components/loading";
import TagList from "../components/tagList";
import BackErrorMessages from "../components/backErrorMessages";
import { CurrentUserContext } from "../context/currentUser";

const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [
    { response: deleteArticleResponse },
    doDeleteArticle,
  ] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessDelite, setSuccessDelite] = useState(false);

  const isAuthor = () => {
    if (!response || !currentUserState.isLoggedIn) {
      return;
    }
    return (
      response.article.author.username === currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: "delete",
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setSuccessDelite(true);
  },[setSuccessDelite, deleteArticleResponse]);

  if (isSuccessDelite) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${response.article.slug}/edit`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="ion-edit" />
                    Edit article
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a" />
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <BackErrorMessages backendErrors={error} />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
              </div>
              <TagList tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
