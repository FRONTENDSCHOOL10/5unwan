import React from 'react';
import styles from "./style.module.css";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext"; // 다크 모드 훅 가져오기

type PageTitleProps = {
  text: string | { __html: string };
  large?: boolean; // large 속성 추가
};

const PageTitle: React.FC<PageTitleProps> = ({ text, large }) => {
  const { isDark } = useDarkMode(); // 다크 모드 상태 가져오기
  const className = `${styles.title} body-xl-bold ${large ? 'heading-4' : ''} ${isDark ? [styles["is-dark"]] : ''}`; // 다크 모드에 따른 클래스 추가

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
