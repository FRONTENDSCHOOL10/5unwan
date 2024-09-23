import { useNavigate } from "react-router-dom";
import styles from "./logoutComplete.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import PageTitle from "@/components/PageTitle";

export function Component() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
        <PageTitle
              large
              text={{ __html: `로그아웃이
              <br />
              완료되었습니다.
              ` }}
            />
          <PrimaryLargeButton onClick={() => navigate("/start")}>
            확인
          </PrimaryLargeButton>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "LogoutCompleteRoute";