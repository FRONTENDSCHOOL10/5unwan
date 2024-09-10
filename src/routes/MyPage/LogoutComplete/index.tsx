import { useNavigate } from "react-router-dom";
import styles from "./logoutComplete.module.css"; 
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";

export default function LogoutComplete() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.message}>
        로그아웃이<br />완료되었습니다.
      </h2>
      <LargeButton onClick={() => navigate("/login")}>
        확인
      </LargeButton>
    </div>
  );
}

