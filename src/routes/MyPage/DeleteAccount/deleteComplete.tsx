import { useNavigate } from "react-router-dom";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";
import styles from "./deleteComplete.module.css";


export default function DeleteComplete() {
	const navigate = useNavigate();

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>
	회원 탈퇴가 완료되었습니다.
	</h1>
      <LargeButton onClick={() => navigate("/login")}>확인</LargeButton>
    </div>
  );
}
