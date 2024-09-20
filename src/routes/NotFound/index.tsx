import styles from "./notFound.module.css";
import { useNavigate } from "react-router-dom";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";


export default function NotFound() {
  const navigate = useNavigate();
  function handleGoHome() {
    navigate("/");
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles["notFound-contents"]}>
          <h1 className={`${styles.title} body-xl-bold`}>
            알 수 없는 오류로 인해
            <br />
            페이지를 불러올 수 없습니다.
          </h1>
          <PrimaryLargeButton onClick={handleGoHome}>
            홈으로 가기
          </PrimaryLargeButton>
        </div>
      </section>
    </>
  );
}
