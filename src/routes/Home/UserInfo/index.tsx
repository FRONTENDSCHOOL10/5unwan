import { useState } from 'react';
import { User, getPbImageUrl, logout } from '@/api/pocketbase';
import styles from './userInfo.module.css';
import classNames from "classnames";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface userProps {
  user: User;
}

export default function UserInfo({ user }: userProps) {
  const { isDark } = useDarkMode();
  const getUserAvatar = getPbImageUrl(user, user.avatar) ?? undefined;
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess() {
      queryClient.clear();
      navigate("/login");
    },
  });
  
  function handleMenuClick() {
    setShow(!show);
  }

  return (
    <div className={classNames(styles.wrapper, { [styles["is-dark"]]: isDark })}>
      <div className={styles["user-info"]}>
        <h1><strong className={styles["user-name"]}>{user.nickname}</strong>님 안녕하세요!</h1>
        <p>오늘도 <strong>득근득근!</strong></p>
      </div>
      <div className={styles["user-profile-wrapper"]}>
        <button type="button" className={styles["user-profile"]} onClick={handleMenuClick}>
          <img src={user.avatar ? getUserAvatar :'/avatar-placeholder.webp'} alt={`${user.nickname}님의 프로필`} />
        </button>
        <ul className={show ? styles["is-active"] : ''}>
          <li className="body-sm-regular"onClick={() => navigate('/my-page')}>마이페이지</li>
          <li className="body-sm-regular" onClick={async () => { await logoutMutation.mutateAsync() }}>로그아웃</li>
        </ul>
      </div>
    </div>
  )
}