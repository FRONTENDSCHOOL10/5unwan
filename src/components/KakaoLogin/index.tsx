import styles from './kakaoLogin.module.css';
import { kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SVGIcon from '@/components/SVGicon';

interface kakaoType {
  type?: string,
}

export default function KakaoLogin({type} :kakaoType) {
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

  if (type === "button") {
    return (
      <button type="button" className={`body-md-bold ${styles["login-kakao-button"]}`} onClick={kakaoLogin}>
        <SVGIcon iconId="iconKakao" width="36" height="36" />
        카카오 로그인
      </button>
    )
  }

  return (
    <div className={styles["login-kakao"]}>
      <span className="">카카오로 간편하게<br />시작하기</span>
      <button type="button" onClick={kakaoLogin}>
        <SVGIcon iconId="iconKakao" width="36" height="36" />
      </button>
    </div>
  )
}