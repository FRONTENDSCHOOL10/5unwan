import { User } from '@/api/pocketbase';
import styles from './userInfo.module.css';
import classNames from "classnames";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

interface userProps {
  user: User;
}

export default function UserInfo({ user }: userProps) { 
  const { isDark } = useDarkMode(); // DarkMode

  return (
    <div className={classNames(styles.wrapper, { [styles["is-dark"]]: isDark })}>
      <div className={styles["user-info"]}>
        <h1><strong className={styles["user-name"]}>{user.nickname}</strong>님 안녕하세요!</h1>
        <p>오늘도 <strong>득근득근!</strong></p>
      </div>
      <div className={styles["user-profile"]}>
        {/* <img src="" alt="" /> 유저 프로필이 들어올 경우 추가?? */}
      </div>
    </div>
  )
}