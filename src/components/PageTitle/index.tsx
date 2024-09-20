import React from 'react';
import styles from "./style.module.css"

interface PageTitleProps {
  text: string  | { __html: string };
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return typeof text === 'string' ? (
    <h1 className={`${styles.title} body-xl-bold`}>{text}</h1>
  ) : (
    <h1 className={`${styles.title} body-xl-bold`} dangerouslySetInnerHTML={text} />
  );
};

export default PageTitle;