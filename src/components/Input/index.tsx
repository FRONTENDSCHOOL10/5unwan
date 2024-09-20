import { useId } from 'react';
import styles from './input.module.css';
import SVGIcon from '@/components/SVGicon';
import {PrimaryMiniButton} from "@/components/Buttons/PrimaryButton/index";

interface InputProps {
  type?: "text" | "search" | "email" | "password" | "checked" | "radio" | "number",
  disabled?: boolean,
  labelTitle?: string,
  labelHide?: boolean,
  placeholder?: string
  errorText?: string,
  errorTextHide?: boolean,
  min?: number,
  max?: number,
  value?: string | undefined,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isDark?: boolean,
  button?: boolean,
  buttonName?: string,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  labelClassName?: string,
}

export default function Input({
  type = "text",
  name,
  disabled = false,
  labelTitle = "타이틀",
  labelHide = false,
  placeholder = "내용을 입력해 주세요.",
  errorText = "내용을 입력해 주세요.",
  errorTextHide = false,
  min,
  max,
  value,
  onChange,
  isDark = false,
  button = false,
  buttonName = '버튼',
  onKeyDown,
}: InputProps) {
  const inputId = useId();

  if (disabled) {
    return (
      <div className={`${styles["input"]} ${isDark ? styles["is-dark"] : ""}`}>
        <label htmlFor={inputId} className={`${labelHide ? "sr-only" : "body-sm-medium"}`}>{labelTitle}</label>
        <div className={styles["input-wrapper"]}>
          <input
            type={type}
            name={name}
            id={inputId}
            className="body-sm-medium"
            placeholder={placeholder}
            minLength={min}
            maxLength={max}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled
          />
        </div>
        <span className={errorTextHide ? "sr-only" : "body-xs"}>{errorText}</span>
      </div>
    )
  }

  if (button) {
    return (
      <div className={`${styles["input"]} ${isDark ? styles["is-dark"] : ""}`}>
        <label htmlFor={inputId} className={`${labelHide ? "sr-only" : "body-sm-medium"}`}>{labelTitle}</label>
        <div className={styles["input-wrapper"]}>
          <input
            type={type}
            name={name}
            id={inputId}
            className="body-sm-medium"
            placeholder={placeholder}
            minLength={min}
            maxLength={max}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <PrimaryMiniButton type="submit">{ buttonName }</PrimaryMiniButton>
        </div>
        <span className={errorTextHide ? "sr-only" : "body-xs"}>{errorText}</span>
      </div>
    )
  }

  if (type === "search") {
    return (
      <div className={`${styles["input"]} ${isDark ? styles["is-dark"] : ""}`}>
        <label htmlFor={inputId} className={`${labelHide ? "sr-only" : "body-sm-medium"}`}>{labelTitle}</label>
        <div className={styles["input-wrapper"]}>
          <div className={styles["search-icon"]}>
            <SVGIcon iconId="iconSearch" width={14} height={14} />
          </div>
          <input
            type={type}
            name={name}
            id={inputId}
            className="body-sm-medium"
            placeholder={placeholder}
            minLength={min}
            maxLength={max}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <span className={errorTextHide ? "sr-only" : "body-xs"}>{errorText}</span>
      </div>
    )
  }

  return (
    <div className={`${styles["input"]} ${isDark ? styles["is-dark"] : ""}`}>
      <label htmlFor={inputId} className={`${labelHide ? "sr-only" : "body-sm-medium"}`}>{labelTitle}</label>
      <div className={styles["input-wrapper"]}>
        <input
          type={type}
          name={name}
          id={inputId}
          className="body-sm-medium"
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <span className={errorTextHide ? "sr-only" : "body-xs"}>{errorText}</span>
    </div>
  );
}