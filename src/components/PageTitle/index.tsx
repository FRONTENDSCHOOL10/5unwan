import React from 'react';
import styles from "./style.module.css"

interface PageTitleProps {
  text: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  // return <h1 className={`${styles.title} ${styles['body-xl-bold']}`}>{text}</h1>;
  return <h1 className={`${styles.title} body-xl-bold`}>{text}</h1>;
};

export default PageTitle;
