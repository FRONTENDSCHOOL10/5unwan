import styles from './start.module.css';
import { kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { SecondaryLargeButton } from '@/components/Buttons/SecondaryButton';
import SVGIcon from '@/components/SVGicon';

export default function Start() {
  const navigate = useNavigate();
  const kakaoSignUpOrLoginMutation = useMutation({
    mutationFn: kakaoSignUpOrLogin,
    onSuccess: () => {
      navigate("/");
    },
  });

  async function kakaoLogin() {
    await kakaoSignUpOrLoginMutation.mutateAsync();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <figure>
          <img src="/favicon.png" alt="득근득근 로고" />
          <figcaption className="body-lg-regular">나만의 득근기록</figcaption>
        </figure>
      </h1>
      <div className={styles["login-wrapper"]}>
        <PrimaryLargeButton to="/login" type="button">로그인</PrimaryLargeButton>
        <SecondaryLargeButton to="/register" type="button">회원가입</SecondaryLargeButton>
      </div>
      <div className={styles["login-kakao"]}>
        <span className="">카카오로 간편하게<br />시작하기</span>
        <button type="button" onClick={kakaoLogin}>
          <SVGIcon iconId="iconKakao" width="36" height="36" />
        </button>
      </div>
    </div>
  );
}
