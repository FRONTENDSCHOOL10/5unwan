import { useNavigate } from "react-router-dom";
import styles from "./logoutComplete.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";

export default function LogoutComplete() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.message}>
        로그아웃이
        <br />
        완료되었습니다.
      </h2>
      <PrimaryLargeButton onClick={() => navigate("/login")}>
        확인
      </PrimaryLargeButton>
    </div>
  );
}
