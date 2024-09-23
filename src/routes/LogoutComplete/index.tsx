import { useNavigate } from "react-router-dom";
import styles from "./logoutComplete.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";

export function Component() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.message}>
        로그아웃이
        <br />
        완료되었습니다.
      </h2>
      <PrimaryLargeButton onClick={() => navigate("/start")}>
        확인
      </PrimaryLargeButton>
    </div>
  );
}

Component.displayName = "LogoutCompleteRoute";
