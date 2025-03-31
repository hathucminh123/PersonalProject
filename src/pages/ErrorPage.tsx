import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import React from "react";
interface ErrorResponse {
  status: number;
  statusText?: string;
  data?: {
    message?: string;
  };
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse | null;

  let title: string = "An Error occurred!";
  let message: string = "Something went wrong!";

  if (error && error.status === 500 && error.data?.message) {
    message = error.data.message;
  }

  if (error && error.status === 404) {
    title = "Not Found!";
    message = "Could not find the resource or page.";
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
};

export default ErrorPage;
