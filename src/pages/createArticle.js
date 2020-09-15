import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../components/articleForm";
import { CurrentUserContext } from "../context/currentUser";
import useFetch from "../hooks/useFetch";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [currentUserState] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  const [isSuccessSubmit, setSuccessSubmit] = useState(false);

  const handleSubmit = (article) => {
    console.log("handleSubmit", article);
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setSuccessSubmit(true);
  }, [response]);

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (!currentUserState.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <ArticleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        error={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;
