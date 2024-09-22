import styles from "./login.module.css";
import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import Header from "@/components/Header";
import { LoginForm } from "./LoginForm";
import KakaoLogin from "@/components/KakaoLogin";

export function Component() {
  const navigate = useNavigate();
  const matches = useMatches();

  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {!hideHeader && (
        <Header
          leftIconId={"iconArrowsLeft"}
          leftIconVisible
          leftonClick={handleGoBack}
          rightIconVisible
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <LoginForm
            onSuccess={() => {
              navigate("/");
            }}
          />
          <span className={styles.kakao}>
            <KakaoLogin />
          </span>
        </div>
      </div>
    </>
  );
}

Component.displayName = "LoginRoute";
