import styles from './input.module.css';

interface InputProps {
  status: string
}

export default function Input({ status }: InputProps) {
  function getInputStatus() {
    switch (status) {
      case 'search':
        return styles.inputSearch;
      case 'disabled':
        return `${styles.inputText} ${styles.disabled}`;
      case 'text':
        return styles.inputText;
      default:
        return styles.inputText;
    }
  }

  return (
    <>
      {
        status === 'search'
          ?
          <div className={styles.inputSearch}>
            <label htmlFor="search" className="visually-hidden">검색어</label>
            <input type="text" id="search" className="body-sm" placeholder="검색어를 입력해 주세요." />
          </div>
          :
          status === 'disabled'
            ?
            <div className={getInputStatus()}>
              <label htmlFor="text" className="body-sm">타이틀</label>
              <input type="text" id="text" className="body-sm" disabled placeholder="내용을 입력해 주세요." />
              <span className="body-xs">내용을 입력해 주세요.</span>
            </div>
            :
            <div className={getInputStatus()}>
              <label htmlFor="text" className="body-sm">타이틀</label>
              <input type="text" id="text" className="body-sm" placeholder="내용을 입력해 주세요." />
              <span className="body-xs">내용을 입력해 주세요.</span>
            </div>
      }
    </>
  )
}