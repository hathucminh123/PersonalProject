// import classes from "./PageContent.module.css";
import React from "react";

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

const PageContent: React.FC<ContentProps> = ({ title, children }) => {
  return (
    <div className="text-center">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
