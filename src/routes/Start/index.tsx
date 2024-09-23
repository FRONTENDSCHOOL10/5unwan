import styles from "./start.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { SecondaryLargeButton } from "@/components/Buttons/SecondaryButton";
import KakaoLogin from "@/components/KakaoLogin";

export function Component() {
  return (
    <section className={styles.container}>
      <h1 className={styles.logo}>
        <div className={styles["logo-wrapper"]}>
          <img rel="preload" alt="" />
          <span className="body-md-bold">나만의 득근기록</span>
        </div>
      </h1>
      <div className={styles["login-group"]}>
        <KakaoLogin type="button" />
        <PrimaryLargeButton to="/login" type="button">
          로그인
        </PrimaryLargeButton>
        <SecondaryLargeButton to="/register" type="button">
          회원가입
        </SecondaryLargeButton>
      </div>
    </section>
  );
}

Component.displayName = "StartRoute";
