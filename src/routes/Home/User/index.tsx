import styles from './user.module.css';

export default function User() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["user-info"]}>
        <h1><strong className={styles["user-name"]}>홍길동</strong>님 안녕하세요!</h1>
        <p>오늘도 <strong>득근득근!</strong></p>
      </div>
      <div className={styles["user-profile"]}>
        {/* <img src="" alt="" /> 유저 프로필이 들어올 경우 추가?? */}
      </div>
    </div>
  )
}