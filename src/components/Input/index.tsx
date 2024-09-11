import { useId } from 'react';
import styles from './input.module.css';

interface InputProps {
  status?: string,
  isDark?: boolean
}

function getInputStatus(status :string, isDark :boolean) {
  const darkClass = isDark ? styles["is-dark"] : '';

  switch (status) {
    case 'search':
      return `${styles["input-search"]} ${darkClass}`;
    case 'disabled':
      return `${styles["input-text"]} ${darkClass}`;
    case 'text':
      return `${styles["input-text"]} ${darkClass}`;
    default:
      return `${styles["input-text"]} ${darkClass}`;
  }
}

export default function Input({ status = 'text', isDark = false }: InputProps) {
  const searchInputId = useId();
  const textInputId = useId();
  const textDisabledInputId = useId();

  if (status === 'search') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={searchInputId} className="sr-only">검색어</label>
        <input type="text" id={searchInputId} className="body-sm" placeholder="검색어를 입력해 주세요." />
      </div>
    );
  }

  if (status === 'disabled') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={textDisabledInputId} className="body-sm">타이틀</label>
        <input type="text" id={textDisabledInputId} className="body-sm" placeholder="내용을 입력해 주세요." disabled />
        <span className="body-xs">내용을 입력해 주세요.</span>
      </div>
    );
  }

  return (
    <div className={getInputStatus(status, isDark)}>
      <label htmlFor={textInputId} className="body-sm">타이틀</label>
      <input type="text" id={textInputId} className="body-sm" placeholder="내용을 입력해 주세요." />
      <span className="body-xs">내용을 입력해 주세요.</span>
    </div>
  );
}