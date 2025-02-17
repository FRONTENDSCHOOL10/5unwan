import { useNavigate } from "react-router-dom";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import styles from "./deleteComplete.module.css";

export function Component() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원 탈퇴가 완료되었습니다.</h1>
      <PrimaryLargeButton onClick={() => navigate("/start")}>
        확인
      </PrimaryLargeButton>
    </div>
  );
}

Component.displayName = "DeleteCompleteRoute";
