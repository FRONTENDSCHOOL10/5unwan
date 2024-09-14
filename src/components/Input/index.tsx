import { useId } from 'react';
import styles from './input.module.css';
import SVGIcon from '@/components/SVGicon';
interface InputProps {
  status?: string,
  isDark?: boolean,
  placeholder?: string,
  title?: string,
  titleHide?: boolean,
  text?: string,
  textHide?: boolean,
  buttonName?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  minLength?: number,
  maxLength?: number,
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
  textHide = false,
  buttonName = '버튼',
  value,
  minLength,
  maxLength,
  onChange,
}: InputProps) {
  const searchInputId = useId();
  const textInputId = useId();
  const textDisabledInputId = useId();

  if (status === 'search') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={searchInputId} className="sr-only">{title}</label>
        <form action="">
          <input
            type="text"
            id={searchInputId}
            className="body-sm-medium"
            placeholder={placeholder}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange} />
          <button type="button" className={styles["search-icon"]}>
            <SVGIcon iconId="iconSearch" width={14} height={14} />
          </button>
        </form>
      </div>
    )
  }

  if (status === 'disabled') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={textDisabledInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
        <form>
          <input
            type="text"
            id={searchInputId}
            className="body-sm-medium"
            placeholder={placeholder}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            disabled
          />
          <span className={textHide ? "sr-only" : "body-xs"}>{text}</span>
        </form>
      </div>
    );
  }

  if (status === 'button') {
    return (
      <div className={getInputStatus(status, isDark)}>
        <label htmlFor={textInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
        <form>
          <input
            type="text"
            id={searchInputId}
            className="body-sm-medium"
            placeholder={placeholder}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
          />
          <button type="button" className="body-sm-medium">{buttonName}</button>
          <span className={textHide ? "sr-only" : "body-xs"}>{text}</span>
        </form>
      </div>
    );
  }

  return (
    <div className={getInputStatus(status, isDark)}>
      <label htmlFor={textInputId} className={titleHide ? "sr-only" : ''}>{title}</label>
      <form>
        <input type="text" id={textInputId} className="body-sm-medium" placeholder={placeholder} onChange={onChange} />
        <span className={textHide ? "sr-only" : ''}>{text}</span>
      </form>
    </div>
  );
}