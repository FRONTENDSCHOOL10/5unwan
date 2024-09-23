import React, { useId, forwardRef } from 'react';
import styles from './input.module.css';
import SVGIcon from '@/components/SVGicon';
import { PrimaryMiniButton } from "@/components/Buttons/PrimaryButton/index";

interface InputProps {
  type?: "text" | "search" | "email" | "password" | "radio" | "number" | "file" | "time" | "checked",
  name?: string,
  disabled?: boolean,
  labelTitle?: string,
  labelHide?: boolean,
  placeholder?: string,
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
  accept?: string,
  checked?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
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
  accept,
  checked,
}, ref) => {
  const inputId = useId();

  const inputClass = `${styles["input"]} ${isDark ? styles["is-dark"] : ""}`;
  const labelClass = labelHide ? "sr-only" : "body-sm-medium";
  const errorClass = errorTextHide ? "sr-only" : "body-xs";

  return (
    <div className={inputClass}>
      <label htmlFor={inputId} className={labelClass}>{labelTitle}</label>
      <div className={styles["input-wrapper"]}>
        {type === "search" && (
          <div className={styles["search-icon"]}>
            <SVGIcon iconId="iconSearch" width={14} height={14} />
          </div>
        )}
        <input
          ref={ref}
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
          accept={accept}
          checked={checked}
          disabled={disabled}
        />
        {button && <PrimaryMiniButton type="submit">{buttonName}</PrimaryMiniButton>}
      </div>
      <span className={errorClass}>{errorText}</span>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
