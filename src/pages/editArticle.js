import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../components/articleForm";
import { CurrentUserContext } from "../context/currentUser";
import useFetch from "../hooks/useFetch";

const EditArticle = ({ match }) => {
  const slug = match.params.slug;

  const [currentUserState] = useContext(CurrentUserContext);

  const apiUrl = `/articles/${slug}`;

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);

  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);

  const [initialValues, setInitialValues] = useState(null);

  const [isSuccessSubmit, setSuccesSubmit] = useState(false);

  const handleSubmit = (article) => {
    console.log("handle", article);
    doUpdateArticle({
      method: "put",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setSuccesSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isloggedIn === "false") {
    return <Redirect to="/" />;
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      error={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
