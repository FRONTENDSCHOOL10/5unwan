import React from 'react';
import styles from "./style.module.css"

type PageTitleProps = {
  text: string | { __html: string };
  large?: boolean; // large 속성 추가
};

const PageTitle: React.FC<PageTitleProps> = ({ text, large }) => {
  const className = `${styles.title} body-xl-bold ${large ? 'heading-4' : ''}`; // 조건부 클래스

  return typeof text === 'string' ? (
    <h1 className={className}>{text}</h1>
  ) : (
    <h1 className={className} dangerouslySetInnerHTML={text} />
  );
};

export default PageTitle; // default export

// 사용 예시
// <PageTitle text="일반 제목" />
// <PageTitle text="큰 제목" large />
