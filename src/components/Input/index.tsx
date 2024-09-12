import { useId } from 'react';
import styles from './input.module.css';
import SVGIcon from '../SVGicon';

interface InputProps {
  status?: string,
  isDark?: boolean,
  placeholder?: string,
  title?: string,
  titleHide?: boolean,
  text?: string,
  textHide?: boolean,
  buttonName?: string,
}

function getInputStatus(status :string, isDark :boolean) {
  const darkClass = isDark ? styles["is-dark"] : '';

  switch (status) {
    case 'search':
      return `${styles["input-search"]} ${darkClass}`;
    case 'disabled':
      return `${styles["input-text"]} ${darkClass}`;
    case 'button':
      return `${styles["input-button"]} ${darkClass}`;
    default:
      return `${styles["input-text"]} ${darkClass}`;
  }
}

export default function Input({
  status = "text",
  title = "타이틀",
  titleHide = false,
  isDark = false,
  placeholder = "내용을 입력해 주세요.",
  text = "내용을 입력해 주세요.",
  textHide = true,
  buttonName = '버튼'
}: InputProps) {
  const searchInputId = useId();
  const textInputId = useId();
  const textDisabledInputId = useId();

  if (status === 'search') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={searchInputId} className="sr-only">{title}</label>
        <input type="text" id={searchInputId} className="body-sm-medium" placeholder={placeholder} />
        <button type="button" className={styles["search-icon"]}>
          <SVGIcon iconId="iconSearch" width={14} height={14} />
        </button>
      </div>
    );
  }

  if (status === 'disabled') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={textDisabledInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
        <input type="text" id={textDisabledInputId} className="body-sm-medium" placeholder={placeholder} disabled />
        {textHide ? <span className="body-xs">{text}</span> : null}
      </div>
    );
  }

  if (status === 'button') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={textInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
        <form>
          <input type="text" id={textInputId} className="body-sm-medium" placeholder={placeholder} />
          <button type="button" className="body-sm-medium">{buttonName}</button>
        </form>
        {textHide ? <span className="body-xs">{text}</span> : null}
      </div>
    );
  }

  return (
    <div className={getInputStatus(status, isDark)}>
      <label htmlFor={textInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
      <input type="text" id={textInputId} className="body-sm-medium" placeholder={placeholder} />
      {textHide ? <span className="body-xs">{text}</span> : null}
    </div>
  );
}